import * as t from 'io-ts'
import { ioFormattedUser } from '.'

export type FormattedUserType = t.TypeOf<typeof ioFormattedUser>
