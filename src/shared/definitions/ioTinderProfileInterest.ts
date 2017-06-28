import * as t from 'io-ts'
import { ioTinderInterest } from '.'

export const ioTinderProfileInterest = t.intersection([
	ioTinderInterest,
	t.interface({
		created_time: t.string
	})
])
