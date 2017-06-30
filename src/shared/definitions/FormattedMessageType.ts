import * as t from 'io-ts'
import { ioFormattedMessage } from '.'

export type FormattedMessageType = t.TypeOf<typeof ioFormattedMessage>
