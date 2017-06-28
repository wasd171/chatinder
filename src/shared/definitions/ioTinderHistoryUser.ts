import * as t from 'io-ts'
import { ioTinderPhoto } from '.'

export const ioTinderHistoryUser = t.intersection([
	t.interface({
		_id: t.string,
		birth_date: t.string,
		name: t.string,
		photos: t.array(ioTinderPhoto)
	}),
	t.partial({
		bio: t.string
	})
])
