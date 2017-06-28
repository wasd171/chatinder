import * as t from 'io-ts'

export const ioTinderSchool = t.intersection([
	t.interface({
		name: t.string
	}),
	t.partial({
		id: t.string
	})
])
