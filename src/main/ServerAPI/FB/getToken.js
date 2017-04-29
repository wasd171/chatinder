// @flow
import {BrowserWindow} from 'electron'


type windowType = Electron.BrowserWindow | null;
interface ITokenRes {
	token: string,
	expiresIn: number
}

export default function getToken(silent: boolean): Promise<ITokenRes> {
	return new Promise((resolve, reject) => {
		let userAgent = "Mozilla/5.0 (Linux; U; en-gb; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.16 Safari/535.19";

		let authUrl = ``;
		authUrl += `https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067://authorize/&`;
		authUrl += `state={"challenge":"q1WMwhvSfbWHvd8xz5PT6lk6eoA%3D","com.facebook.sdk_client_state":true,`;
		authUrl += `"3_method":"sfvc_auth"}&scope=user_birthday,user_photos,user_education_history,email,`;
		authUrl += `user_relationship_details,user_friends,user_work_history,user_likes&response_type=token,`;
		authUrl += `signed_request&default_audience=friends&return_scopes=true&auth_type=rerequest&`;
		authUrl += `client_id=464891386855067&ret=login&sdk=ios`;

		let win: windowType = new BrowserWindow({
			width: 640,
			height: 640,
			show: false,
			webPreferences: {
				nodeIntegration: false
			}
		});

		if (win !== null) {
			win.on('closed', () => {
				win = null;
			});

			win.webContents.on('will-navigate', (e, url) => {
				const raw 		= /access_token=([^&]*)/.exec(url) || null;
				const token 	= (raw && raw.length > 1) ? raw[1] : null;
				const error    	= /\?error=(.+)$/.exec(url);

				if (!error) {
					if (token) {
						const expiresStringRegex = /expires_in=(.*)/.exec(url);
						let expiresIn;
						if (expiresStringRegex !== null && expiresStringRegex.length >= 2) {
							expiresIn = parseInt(expiresStringRegex[1]);
						} else {
							throw new Error('Unable to retrieve expiration date from Facebook');
						}
						// Way to handle Electron bug https://github.com/electron/electron/issues/4374
						setImmediate(() => {
							if (win !== null) {
								win.close()
							}
						});
						resolve({token, expiresIn});
					}
				} else {
					reject(error);
				}
			});

			win.webContents.on('did-finish-load', async () => {
				if (win !== null) {
					let form, action;

					const script = `document.getElementById('platformDialogForm')`;
					form = await asyncExecute(win, script);
					if (form) {
						action = await asyncExecute(win, `${script}.action`);
					}

					if (form && action === 'https://m.facebook.com/v2.6/dialog/oauth/confirm') {
						asyncExecute(win, `${script}.submit()`);
					} else {
						if (silent) {
							reject();
							win = null;
						} else {
							win.show();
						}
					}
				}
			});

			win.webContents.on('did-fail-load', () => {
				if (silent) {
					reject();
					win = null;
				}

				if (win !== null) {
					win.loadURL(authUrl, {'userAgent': userAgent});
				}
			})	

			win.loadURL(authUrl, {'userAgent': userAgent});
		}
	})
}

export function asyncExecute(win: windowType, script: string) {
	if (win !== null) {
		return win.webContents.executeJavaScript(script, false);
	} else {
		throw new Error('asyncExecute received null window')
	}
}