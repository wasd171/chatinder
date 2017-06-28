import * as t from 'io-ts'
import { ioTinderSchool } from '.'

export const ioTinderProfileSchool = t.intersection([
	ioTinderSchool,
	t.interface({
		year: t.string,
		displayed: t.boolean
	})
])
