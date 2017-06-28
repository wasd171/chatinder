import * as t from 'io-ts'
import { ioTinderHistoryUser, ioTinderHistoryMessage } from '.'

export const ioTinderMatch = t.intersection([
	t.interface({
		_id: t.string,
		last_activity_date: t.string,
		messages: t.array(ioTinderHistoryMessage)
	}),
	t.partial({
		is_super_like: t.boolean,
		person: ioTinderHistoryUser
	})
])
