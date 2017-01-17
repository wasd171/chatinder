import {API_AUTHORIZE, API_AUTHORIZE_SUCCESS, API_SET_TOKEN, API_SET_TOKEN_SUCCESS} from 'app/constants'


export default async function authorize(force = false) {
	const {tinderToken, hasFbTokenExpired, fbToken, fbId} = this;

	if (tinderToken && !force) {
		await this.retrieve({req: API_SET_TOKEN, params: {tinderToken}, res: API_SET_TOKEN_SUCCESS});
	} else if (!hasFbTokenExpired) {
		const token = await this.retrieve({req: API_AUTHORIZE, params: {fbToken, fbId}, res: API_AUTHORIZE_SUCCESS});
		this.setTinderToken(token);
	}

	this.setTinderIsAuthorized(true);
}