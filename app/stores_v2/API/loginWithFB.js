import {FB_GET_TOKEN_SUCCESS, FB_GET_TOKEN_REQUEST, FB_GET_ID_SUCCESS, FB_GET_ID_REQUEST} from 'app/constants'


export default async function loginWithFB() {
	console.log('loginWithFB was called');
	const {token, expiresIn} = await this.retrieve({req: FB_GET_TOKEN_REQUEST, res: FB_GET_TOKEN_SUCCESS});
	const expiresAt = Date.now() + 1000*expiresIn;
	const id = await this.retrieve({req: FB_GET_ID_REQUEST, params: token, res: FB_GET_ID_SUCCESS});

	this.setAuthData({fbToken: token, fbTokenExpiresAt: expiresAt, fbId: id});
}