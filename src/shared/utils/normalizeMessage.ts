import { emojify } from '~/shared/utils'
import * as format from 'date-fns/format'
import { isGIPHY } from '~/shared/utils'
import { UnionMessageType, FormattedMessageType } from '~/shared/definitions'
import { SUCCESS } from '~/shared/constants'

export type MetaMessageType = (UnionMessageType | FormattedMessageType) & {
	status?: string
}

function isFormatted(
	message: MetaMessageType
): message is FormattedMessageType {
	return (message as FormattedMessageType).formattedMessage != null
}

export function normalizeMessage(
	message: MetaMessageType,
	index: number,
	messages: UnionMessageType[]
): FormattedMessageType {
	if (isFormatted(message)) {
		return message
	}

	const msg = { ...message }

	let status = msg.status == null ? SUCCESS : msg.status
	const text = msg.message
	const giphyStatus: boolean = isGIPHY(text)
	const isGIPHYstatus = giphyStatus
	let formattedMessage: string
	if (giphyStatus) {
		formattedMessage = text
	} else {
		formattedMessage = emojify(text)
	}

	let sentDay = format(msg.sent_date, 'MMMM D')
	let sentTime = format(msg.sent_date, 'H:mm')
	let first: boolean
	let firstInNewDay: boolean
	if (index === 0) {
		first = true
		firstInNewDay = true
	} else {
		const prevMessage = messages[index - 1]
		let prevSentDay
		if ((prevMessage as FormattedMessageType).sentDay != null) {
			prevSentDay = (prevMessage as FormattedMessageType).sentDay
		} else {
			prevSentDay = format(prevMessage.sent_date, 'MMMM D')
		}

		if (prevSentDay !== sentDay) {
			first = true
			firstInNewDay = true
		} else if (prevMessage.from !== msg.from) {
			first = true
			firstInNewDay = false
		} else {
			first = false
			firstInNewDay = false
		}
	}

	return {
		...msg,
		status,
		isGIPHY: isGIPHYstatus,
		formattedMessage,
		sentDay,
		sentTime,
		first,
		firstInNewDay
	}
}
