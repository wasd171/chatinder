import * as t from 'io-ts'
import { ioTinderPerson } from '.'

export type TinderPersonType = t.TypeOf<typeof ioTinderPerson>
