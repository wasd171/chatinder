import {BrowserWindow, ipcMain} from 'electron'
import {FB_GET_TOKEN_SUCCESS, FB_GET_TOKEN_FAILURE} from '../app/constants'
import Promise from 'bluebird'


export default function getToken(event) {
	"use strict";

	let win = new BrowserWindow({
		width: 640,
		height: 640,
		show: false,
		webPreferences: {
			nodeIntegration: false
		}
	});

	win.on('closed', () => {
		win = null;
	});

	win.webContents.on('will-navigate', (e, url) => {
		const raw 		= /access_token=([^&]*)/.exec(url) || null;
		const token 	= (raw && raw.length > 1) ? raw[1] : null;
		const error    	= /\?error=(.+)$/.exec(url);

		if (!error) {
			if (token) {
				const expiresIn = parseInt(/expires_in=(.*)/.exec(url)[1]);
				event.sender.send(FB_GET_TOKEN_SUCCESS, {token, expiresIn});
				// Way to handle Electron bug https://github.com/electron/electron/issues/4374
				setImmediate(() => win.close());
			}
		} else {
			event.sender.send(FB_GET_TOKEN_FAILURE, error);
		}
	});

	win.webContents.on('dom-ready', async (e) => {
		let form, action;

		const script = `document.getElementById('platformDialogForm')`;
		form = await asyncExecute(win, script);
		if (form) {
			action = await asyncExecute(win, `${script}.action`);
		}

		if (form && action === 'https://m.facebook.com/v2.6/dialog/oauth/confirm') {
			asyncExecute(win, `${script}.submit()`);
		} else {
			win.show();
		}
	});

	let userAgent = "Mozilla/5.0 (Linux; U; en-gb; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.16 Safari/535.19";

	let authUrl = ``;
	authUrl += `https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067://authorize/&`;
	authUrl += `state={"challenge":"q1WMwhvSfbWHvd8xz5PT6lk6eoA%3D","com.facebook.sdk_client_state":true,`;
	authUrl += `"3_method":"sfvc_auth"}&scope=user_birthday,user_photos,user_education_history,email,`;
	authUrl += `user_relationship_details,user_friends,user_work_history,user_likes&response_type=token,`;
	authUrl += `signed_request&default_audience=friends&return_scopes=true&auth_type=rerequest&`;
	authUrl += `client_id=464891386855067&ret=login&sdk=ios`;

	// win.webContents.session.clearStorageData({}, () => {
	// 	win.loadURL(authUrl, {'userAgent': userAgent});
	// 	// win.show();
	// 	win.openDevTools();
	// });

	win.loadURL(authUrl, {'userAgent': userAgent});
	// win.show();
	// console.log('getToken was called');
};

export function asyncExecute(win, script) {
	"use strict";
	return new Promise((resolve, reject) => {
		win.webContents.executeJavaScript(script, false, resolve);
	})
}