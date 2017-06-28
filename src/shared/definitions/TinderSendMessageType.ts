import * as t from 'io-ts'
import { ioTinderSendMessage } from '.'

export type TinderSendMessageType = t.TypeOf<typeof ioTinderSendMessage>
