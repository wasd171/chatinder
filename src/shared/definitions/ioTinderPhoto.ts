import * as t from 'io-ts'
import { ioTinderPhotoProcessedFile } from '.'

export const ioTinderPhoto = t.intersection([
	t.interface({
		processedFiles: t.array(ioTinderPhotoProcessedFile),
		id: t.string,
		url: t.string
	})
])
