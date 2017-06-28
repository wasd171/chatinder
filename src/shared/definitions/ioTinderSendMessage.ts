import * as t from 'io-ts'

export const ioTinderSendMessage = t.interface({
	_id: t.string,
	from: t.string,
	to: t.string,
	match_id: t.string,
	sent_date: t.string,
	message: t.string,
	created_date: t.string
})
