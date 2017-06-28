import * as t from 'io-ts'
import { ioTinderHistoryUser, ioTinderPerson } from '.'

export const ioUnionUser = t.union([ioTinderHistoryUser, ioTinderPerson])
