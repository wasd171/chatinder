// @flow
export const Match = {
    lastMessage: match => {
        if (match.messages.length === 0) {
            return "It's a match!"
        } else {
            const message = match.messages[match.messages.length - 1];
            if (message.isGIPHY) {
                return "GIPHY"
            } else {
                return message.formattedMessage
            }
        }
    },
    lastActivityDate: match => match.last_activity_date,
    isSuperLike: match => match.is_super_like
}