// @flow
import parse from 'url-parse'
import emojione from '~/app/shims/emojione'
import he from 'he'
import {VIEW_CHAT, VIEW_USER, VIEW_LOADING} from '../constants'


export function isGIPHY(message: string) {
	'use strict';
	return /^https?:\/\/(.*)giphy.com/.test(message)
}

export function getNormalizedSizeOfGIPHY(message: string) {
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

export function nameToPath(name: string) {
	switch (name) {
		case VIEW_CHAT:
			return `/:id/${VIEW_CHAT}`
		case VIEW_USER:
			return `/:id/${VIEW_USER}`
		case VIEW_LOADING:
			return `/${VIEW_LOADING}/:title`
		default:
			return `/${name}`
	}
}


export function emojify(text: string): string {
	return emojione.unicodeToImage(he.escape(text))
}

export {normalizeMessage} from './normalizeMessage'
export {resolveMessage} from './resolveMessage'
export {normalizeMessagePair} from './normalizeMessagePair'