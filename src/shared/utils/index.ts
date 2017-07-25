import { URL } from 'url'

export function getNormalizedSizeOfGIPHY(message: string) {
	const maxHeight = 170
	const maxWidth = 255
	const url = new URL(message)

	const strHeight = url.searchParams.get('height')
	const strWidth = url.searchParams.get('width')

	if (strHeight === null || strWidth === null) {
		throw new Error(
			`Unable to get width and/or height for the following giphy: ${message}`
		)
	}

	let height: number, width: number
	height = parseInt(strHeight, 10)
	width = parseInt(strWidth, 10)

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
export { resolveDatabases } from './resolveDatabases'
export { resolveRoot } from './resolveRoot'
export { fromCallback } from './fromCallback'
