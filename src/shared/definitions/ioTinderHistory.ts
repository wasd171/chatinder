import * as t from 'io-ts'
import { ioTinderMatch } from '.'

export const ioTinderHistory = t.interface({
	matches: t.array(ioTinderMatch),
	blocks: t.array(t.string)
})
