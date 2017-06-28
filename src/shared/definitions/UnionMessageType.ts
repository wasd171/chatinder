import * as t from 'io-ts'
import { ioUnionMessage } from '.'

export type UnionMessageType = t.TypeOf<typeof ioUnionMessage>
