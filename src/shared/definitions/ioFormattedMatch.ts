import * as t from 'io-ts'
import { ioFormattedMessage, ioFormattedUser } from '.'

export const ioFormattedMatch = t.intersection([
	t.interface({
		_id: t.string,
		last_activity_date: t.string,
		person: ioFormattedUser,
		messages: t.array(ioFormattedMessage)
	}),
	t.partial({
		is_super_like: t.boolean
	})
])
