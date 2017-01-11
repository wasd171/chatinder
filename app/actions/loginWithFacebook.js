import {transaction} from 'mobx'
import {FB_GET_TOKEN_SUCCESS, FB_GET_TOKEN_REQUEST, FB_GET_ID_SUCCESS, FB_GET_ID_REQUEST} from '../constants'
import {waitForIpc} from '../utils'


export default async function loginWithFacebook({auth, ipcRenderer}) {
	const tokenReply = waitForIpc(FB_GET_TOKEN_SUCCESS);
	ipcRenderer.send(FB_GET_TOKEN_REQUEST, null);
	const {token, expiresIn} = await tokenReply;

	const idReply = waitForIpc(FB_GET_ID_SUCCESS);
	ipcRenderer.send(FB_GET_ID_REQUEST, token);
	const id = await idReply;
	transaction(() => {
		'use strict';

		auth.setToken(token);
		auth.setExpiresAt(expiresIn);
		auth.setId(id);
	})
}