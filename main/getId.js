import fetch from 'node-fetch'
import {FB_GET_ID_FAILURE, FB_GET_ID_SUCCESS} from '../app/constants'


export default async function getId(event, token) {
	"use strict";

	const res = await fetch(`https://graph.facebook.com/me?fields=id&access_token=${token}`);
	const jsonRes = await res.json();

	if (jsonRes.error || !(res.status >= 200 && res.status < 300)) {
		event.sender.send(FB_GET_ID_FAILURE, jsonRes.error);
	} else {
		event.sender.send(FB_GET_ID_SUCCESS, jsonRes.id);
	}
	// FB.setAccessToken(arg);
	// FB.api('/me', {fields: ['id']}, (res) => {
	// 	if (res.error) {
	// 		event.sender.send(FB_GET_ID_FAILURE, res.error);
	// 	} else {
	// 		event.sender.send(FB_GET_ID_SUCCESS, res.id);
	// 	}
	// })
};