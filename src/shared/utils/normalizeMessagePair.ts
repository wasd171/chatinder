import { normalizeMessage, MetaMessageType } from './normalizeMessage'

export function normalizeMessagePair(
	message: MetaMessageType,
	lastMessage?: MetaMessageType
) {
	let newMessage
	if (typeof lastMessage === 'undefined') {
		;[newMessage] = [message].map(normalizeMessage)
	} else {
		;[, newMessage] = [lastMessage, message].map(normalizeMessage)
	}
	return newMessage
}
