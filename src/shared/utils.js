// @flow
import parse from 'url-parse'
import {VIEW_CHAT, VIEW_USER, VIEW_LOADING} from './constants'
import isReachable from 'is-reachable'


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
