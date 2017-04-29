// @flow
import {PSEUDO} from '~/shared/constants'
import {property} from 'lodash'


export const Match = {
    lastMessage: match => {
        if (match.messages.length === 0) {
            return {
                formattedMessage: "It's a match!",
                status: PSEUDO
            }
        } else {
            const message = match.messages[match.messages.length - 1];
            if (message.isGIPHY) {
                return {
                    formattedMessage: "GIPHY",
                    status: PSEUDO
                }
            } else {
                return message
            }
        }
    },
    lastActivityDate: property('last_activity_date'),
    isSuperLike: property('is_super_like')
}