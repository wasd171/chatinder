import { types, destroy } from 'mobx-state-tree'
import { SUCCESS } from '~/shared/constants'
import { isGIPHY, emojify } from '.'
import * as format from 'date-fns/format'

// Have to do it manually because TS is not smart enough for recursive types
export interface IMessage {
	_id: string
	from: string
	to: string
	sent_date: string
	message: string
	status: string
	previous: IMessage | null
	next: IMessage | null

	isGIPHY: boolean
	formattedMessage: string
	sentDay: string
	sentTime: string
	sentDate: string
	first: boolean
	firstInNewDay: boolean

	changeStatus(status: string): void
	setPrevious(previous: IMessage | null): void
	setNext(next: IMessage | null): void
	destroy(): void
}

export const Message = types.model(
	'Message',
	{
		_id: types.identifier(types.string),
		from: types.string,
		to: types.string,
		sent_date: types.optional(types.string, () => new Date().toISOString()),
		message: types.string,
		status: types.optional(types.string, SUCCESS),
		previous: types.maybe(
			types.reference(types.late<any, IMessage>(() => Message))
		),
		next: types.maybe(
			types.reference(types.late<any, IMessage>(() => Message))
		),

		get isGIPHY() {
			return isGIPHY(this.message)
		},
		get formattedMessage() {
			if (!this.isGIPHY) {
				return emojify(this.message)
			} else {
				return this.message
			}
		},
		get sentDay() {
			return format(this.sent_date, 'MMMM D')
		},
		get sentTime() {
			return format(this.sent_date, 'H:mm')
		},
		get sentDate() {
			return this.sent_date
		},
		get first() {
			if (this.firstInNewDay) {
				return true
			} else {
				if (this.previous!.from !== this.from) {
					return true
				} else {
					return false
				}
			}
		},
		get firstInNewDay() {
			if (this.previous === null) {
				return true
			} else {
				if (this.previous.sentDay !== this.sentDay) {
					return true
				} else {
					return false
				}
			}
		}
	},
	{
		changeStatus(status: string) {
			this.status = status
		},
		setPrevious(previous: IMessage) {
			this.previous = previous
		},
		setNext(next: IMessage | null) {
			this.next = next
		},
		destroy() {
			if (this.previous !== null) {
				this.previous.setNext(this.next)
			}
			if (this.next !== null) {
				this.next.setPrevious(this.previous)
			}
			destroy(this)
		}
	}
)
