// @flow
import { emojify } from 'shared/utils'
import format from 'date-fns/format'
import { isGIPHY } from 'shared/utils'
import type { MessageType } from 'shared/types'
import { SUCCESS } from 'shared/constants'

export function normalizeMessage(
	message: any,
	index: number,
	messages: any[]
): MessageType {
	const msg = { ...message }

	if (typeof msg.status === 'undefined') {
		msg.status = SUCCESS
	}
	const text = msg.message
	const giphyStatus: boolean = isGIPHY(text)
	msg.isGIPHY = giphyStatus
	if (giphyStatus) {
		msg.formattedMessage = text
	} else {
		msg.formattedMessage = emojify(text)
	}

	msg.sentDay = format(msg.sent_date, 'MMMM D')
	msg.sentTime = format(msg.sent_date, 'H:mm')
	if (index === 0) {
		msg.first = true
		msg.firstInNewDay = true
	} else {
		const prevMessage = messages[index - 1]
		let prevSentDay
		if (typeof prevMessage.sentDay !== 'undefined') {
			prevSentDay = prevMessage.sentDay
		} else {
			prevSentDay = format(prevMessage.sent_date, 'MMMM D')
		}

		if (prevSentDay !== msg.sentDay) {
			msg.first = true
			msg.firstInNewDay = true
		} else if (prevMessage.from !== msg.from) {
			msg.first = true
			msg.firstInNewDay = false
		} else {
			msg.first = false
			msg.firstInNewDay = false
		}
	}

	return msg
}
