import * as t from 'io-ts'
import { ioUnionUser } from '.'

export const ioFormattedUser = t.intersection([
	ioUnionUser,
	t.partial({
		formattedBio: t.string
	})
])
