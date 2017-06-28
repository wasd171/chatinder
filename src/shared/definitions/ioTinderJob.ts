import * as t from 'io-ts'

export const ioTinderJob = t.partial({
	company: t.partial({
		name: t.string
	}),
	title: t.partial({
		name: t.string
	})
})
