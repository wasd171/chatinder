import {retrieveFromApi} from '../utils'
import {API_AUTHORIZE, API_AUTHORIZE_SUCCESS} from '../constants'


export default async function authorizeTinder({auth}) {
	'use strict';
	const {fbToken, fbId} = auth;
	const tinderToken = await retrieveFromApi({
		req: API_AUTHORIZE,
		params: {fbToken, fbId},
		res: API_AUTHORIZE_SUCCESS
	});

	auth.setTinderIsAuthorized(true);
	return tinderToken;
}