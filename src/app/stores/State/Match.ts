import { types, getEnv } from 'mobx-state-tree'
import { Message, Person } from '.'
import { MessageType } from '~/shared/definitions'

type LastMessageType = MessageType | null

interface IRawMatch {
	last_activity_date: string
	messages: any[]
}

export const Match = types.model(
	'Match',
	{
		_id: types.identifier(types.string),
		last_activity_date: types.string,
		messages: types.array(Message),
		is_super_like: types.maybe(types.boolean),
		person: Person,

		get lastActivityDate(): string {
			return this.last_activity_date
		},
		get lastMessage(): LastMessageType {
			if (this.messages.length === 0) {
				return null
			} else {
				const message = this.messages[this.messages.length - 1]
				return message as MessageType
			}
		}
	},
	{
		addMessage(
			message: any,
			previousMessage: LastMessageType
		): MessageType {
			let newMessage: MessageType
			if (previousMessage === null) {
				newMessage = Message.create(message)
			} else {
				newMessage = Message.create({
					...message,
					previous: previousMessage._id
				})
				previousMessage.setNext(newMessage)
			}
			this.messages.push(newMessage)
			return newMessage
		},
		update(match: IRawMatch) {
			this.last_activity_date = match.last_activity_date
			match.messages.forEach(message => {
				const newMessage = this.addMessage(message, this.lastMessage)
				if (newMessage.from === this.person._id) {
					getEnv(this).notifier.notify({
						title: this.person.name,
						body: newMessage.message
					})
				}
			})
		}
	}
)
