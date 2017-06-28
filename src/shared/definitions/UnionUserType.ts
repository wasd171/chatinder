import * as t from 'io-ts'
import { ioUnionUser } from '.'

export type UnionUserType = t.TypeOf<typeof ioUnionUser>
