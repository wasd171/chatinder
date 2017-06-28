import * as t from 'io-ts'
import { ioTinderSendMessage } from '.'

export const ioTinderHistoryMessage = t.intersection([
	ioTinderSendMessage,
	t.interface({
		timestamp: t.number
	})
])
