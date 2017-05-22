// @flow
import parse from 'url-parse'

export function isGIPHY(message: string) {
	'use strict'
	return /^https?:\/\/(.*)giphy.com/.test(message)
}

export function getNormalizedSizeOfGIPHY(message: string) {
	const maxHeight = 170
	const maxWidth = 255
	const { query } = parse(message, true)
	let height, width
	height = parseInt(query.height, 10)
	width = parseInt(query.width, 10)

	if (height > maxHeight) {
		width = width * (maxHeight / height)
		height = maxHeight
	}
	if (width > maxWidth) {
		height = height * (maxWidth / width)
		width = maxWidth
	}

	return { height, width }
}

export { nameToPath } from './nameToPath'
export { resolve } from './resolve'
export { resolveDatabases } from './resolveDatabases'
export { resolveRoot } from './resolveRoot'
export { emojify } from './emojify'
export { normalizeMessage } from './normalizeMessage'
export { resolveMessage } from './resolveMessage'
export { normalizeMessagePair } from './normalizeMessagePair'
