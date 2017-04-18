// @flow
import parse from 'url-parse'


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