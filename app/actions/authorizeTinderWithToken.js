import {API_SET_TOKEN, API_SET_TOKEN_SUCCESS} from '../constants'
import {retrieveFromApi} from '../utils'


export default async function authorizeTinderWithToken({auth}) {
	'use strict';
	const {authToken} = auth;
	await retrieveFromApi({req: API_SET_TOKEN, params: {authToken}, res: API_SET_TOKEN_SUCCESS});

	auth.setTinderIsAuthorized(true);
}