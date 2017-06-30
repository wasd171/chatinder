import * as t from 'io-ts'
import { ioTinderGlobals, ioTinderProfileUser } from '.'

export const ioTinderDefaults = t.union([
	t.interface({
		token: t.string,
		user: ioTinderProfileUser,
		globals: ioTinderGlobals
	}),
	t.null
])
