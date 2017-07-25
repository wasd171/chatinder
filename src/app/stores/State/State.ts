import { types, getEnv, destroy, getSnapshot } from 'mobx-state-tree'
import { Match, Defaults, Message } from '.'
import { Notifier } from '../Notifier'
import { MatchType, MessageType } from '~/shared/definitions'
import * as Raven from 'raven-js'
import { FAILURE } from '~/shared/constants'

interface IMatchRaw {
	_id: string
	messages: any[]
	last_activity_date: string
}

export interface IUpdate {
	matches: IMatchRaw[]
	blocks: string[]
}

interface ISorter {
	lastActivityDate: string
}

function sorter(a: ISorter, b: ISorter) {
	return Date.parse(b.lastActivityDate) - Date.parse(a.lastActivityDate)
}

export const State = types.model(
	'State',
	{
		matches: types.map(Match),
		defaults: types.maybe(Defaults),
		get sortedMatches(): MatchType[] {
			return [...this.matches.values()].sort(sorter)
		},
		pendingMessages: types.map(types.reference(Message)),
		sentMessages: types.map(types.reference(Message))
	},
	{
		setDefaults(defaults: any) {
			this.defaults = Defaults.create(defaults)
		},
		mergeUpdates(updates: IUpdate, silent: boolean) {
			const { notifier } = getEnv(this) as { notifier: Notifier }

			this.sentMessages.values().forEach((sentMessage: MessageType) => {
				this.sentMessages.delete(sentMessage._id)
				sentMessage.destroy()
			})

			updates.matches.forEach(match => {
				const oldMatch = this.matches.get(match._id)

				if (!oldMatch) {
					const { messages } = match
					try {
						const newMatch = Match.create({
							...match,
							messages: []
						})

						messages.forEach(message => {
							const newMessage = newMatch.addMessage(
								message,
								newMatch.lastMessage
							)
							if (
								!silent &&
								newMessage.from === newMatch.person._id
							) {
								notifier.notify({
									title: newMatch.person.name,
									body: message.message
								})
							}
						})

						this.matches.set(newMatch._id, newMatch)
						if (!silent) {
							notifier.notify({
								title: newMatch.person.name,
								body: 'You have a new match!'
							})
						}
					} catch (err) {
						Raven.captureException(err)
					}
				} else {
					oldMatch.update(match)
				}
			})

			const stop = '\uD83D\uDEAB'

			updates.blocks.forEach(id => {
				const blocked = this.matches.get(id)

				if (blocked) {
					if (!silent) {
						notifier.notify({
							title: blocked.person.name,
							body: `${stop} BLOCKED ${stop}`
						})
					}
					destroy(blocked)
				}
			})
		},
		addMessageToPending(message: MessageType) {
			this.pendingMessages.put(message)
		},
		addMessageToSent(message: MessageType) {
			this.pendingMessages.delete(message._id)
			this.sentMessages.put(message)
		},
		markAllPendingAsFailed() {
			this.pendingMessages.values().forEach((message: MessageType) => {
				message.changeStatus(FAILURE)
			})
		}
	}
)
