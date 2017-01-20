import {ipcRenderer} from 'electron'
import {TINDER_API, FB_GET_TOKEN_REQUEST, FB_GET_ID_REQUEST} from './constants'
import {toJS} from 'mobx'
import Promise from 'bluebird'
import parse from 'url-parse'


export function callApi(type, params = {}) {
	if (type !== FB_GET_TOKEN_REQUEST && type !== FB_GET_ID_REQUEST) {
		ipcRenderer.send(TINDER_API, {type, ...params});
	} else {
		ipcRenderer.send(type, params)
	}
}
window.callApi = callApi;

export function waitForIpc(type) {
	'use strict';
	return new Promise((resolve, reject) => {
		ipcRenderer.once(type, (event, arg) => {
			resolve(arg)
		})
	})
}

export async function retrieveFromApi({req, params = null, res}) {
	let promise;
	if (res) {
		promise = waitForIpc(res);
	}
	callApi(req, params);
	return promise;
}

export function isGIPHY(message) {
	'use strict';
	return /^https?:\/\/(.*)giphy.com/.test(message)
}

export function getNormalizedSizeOfGIPHY(message) {
	const maxHeight = 170;
	const maxWidth = 255;
	const {query} = parse(message, true);
	let height, width, coeff;
	height = parseInt(query.height, 10);
	width = parseInt(query.width, 10);

	if (height > maxHeight) {
		width = width*(maxHeight/height);
		height = maxHeight;
	}
	if (width > maxWidth) {
		height = height*(maxWidth/width);
		width = maxWidth;
	}

	return ({height, width})
}