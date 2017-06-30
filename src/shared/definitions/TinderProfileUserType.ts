import * as t from 'io-ts'
import { ioTinderProfileUser } from '.'

export type TinderProfileUserType = t.TypeOf<typeof ioTinderProfileUser>
