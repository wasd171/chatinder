import * as t from 'io-ts'
import { ioTinderSendMessage, ioTinderHistoryMessage } from '.'

export const ioUnionMessage = t.union([
	ioTinderHistoryMessage,
	ioTinderSendMessage
])
