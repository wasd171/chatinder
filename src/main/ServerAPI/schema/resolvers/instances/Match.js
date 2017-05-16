// @flow
import { PSEUDO } from 'shared/constants'
import { property } from 'lodash'

export const Match = {
	lastMessage: match => {
		if (match.messages.length === 0) {
			return {
				formattedMessage: "It's a match!",
				status: PSEUDO,
				_id: `${match._id}_last`
			}
		} else {
			const message = match.messages[match.messages.length - 1]
			if (message.isGIPHY) {
				return {
					formattedMessage: 'GIPHY',
					status: PSEUDO,
					_id: `${match._id}_last`
				}
			} else {
				return message
			}
		}
	},
	lastActivityDate: property('last_activity_date'),
	isSuperLike: match => {
		if (typeof match.is_super_like === 'undefined') {
			return false
		} else {
			return match.is_super_like
		}
	}
}
