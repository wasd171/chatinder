// @flow
import { normalizeMessage } from './normalizeMessage'

export function normalizeMessagePair(message, lastMessage) {
	let newMessage
	if (typeof lastMessage === 'undefined') {
		;[newMessage] = [message].map(normalizeMessage)
	} else {
		;[, newMessage] = [lastMessage, message].map(normalizeMessage)
	}
	return newMessage
}
