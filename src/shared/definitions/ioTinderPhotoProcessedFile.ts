import * as t from 'io-ts'

export const ioTinderPhotoProcessedFile = t.interface({
	width: t.number,
	url: t.string,
	height: t.number
})
