import {
	AbstractServerAPI,
	TinderHistoryType,
	FormattedMatchType
} from 'shared/definitions'
import { fromCallback } from 'shared/utils'
import { normalizeMatch } from './normalizeMatch'
import { normalizeMessage } from 'shared/utils'

export function handleUpdatesFactory(ctx: AbstractServerAPI) {
	return async function handleUpdates(
		updates: TinderHistoryType
	): Promise<void> {
		const { refetcher, db, notifierServer } = ctx

		await Promise.all(
			updates.matches.map(async match => {
				const query = { _id: match._id }
				const oldMatch = (await fromCallback(callback =>
					db.matches.findOne(query, {}, callback)
				)) as FormattedMatchType | null
				if (!oldMatch) {
					const newMatch = normalizeMatch(match)
					await fromCallback(callback =>
						db.matches.insert(newMatch, callback)
					)
					if (newMatch !== null) {
						notifierServer.notify({
							title: newMatch.person.name,
							body: 'You have a new match!'
						})
						newMatch.messages.forEach(message => {
							if (message.from === newMatch.person._id) {
								notifierServer.notify({
									title: newMatch.person.name,
									body: message.message
								})
							}
						})
					}
				} else {
					let formattedMessages
					let modifier: Object

					if (oldMatch.messages.length === 0) {
						formattedMessages = match.messages.map(normalizeMessage)
						modifier = {
							$set: {
								messages: formattedMessages,
								last_activity_date: match.last_activity_date
							}
						}
					} else {
						let lastMessage =
							oldMatch.messages[oldMatch.messages.length - 1]
						;[lastMessage, ...formattedMessages] = [
							lastMessage,
							...match.messages
						].map(normalizeMessage)
						modifier = {
							$set: {
								last_activity_date: match.last_activity_date
							},
							$push: {
								messages: {
									$each: formattedMessages
								}
							}
						}
					}

					await fromCallback(callback =>
						db.matches.update(query, modifier, {}, callback)
					)
					formattedMessages.forEach(message => {
						if (message.from === oldMatch.person._id) {
							notifierServer.notify({
								title: oldMatch.person.name,
								body: message.message
							})
						}
					})

					refetcher.notifyMatch(match._id)
				}
			})
		)

		await new Promise(async resolve => {
			if (updates.blocks.length === 0) {
				resolve()
			} else {
				const query = { _id: { $in: updates.blocks } }
				const options = { multi: true }
				const stop = '\uD83D\uDEAB'

				const matches = (await fromCallback(callback =>
					db.matches.find(query, options, callback)
				)) as Array<FormattedMatchType>

				await fromCallback(callback =>
					db.matches.remove(query, options, callback)
				)

				matches.forEach(match => {
					notifierServer.notify({
						title: match.person.name,
						body: `${stop} BLOCKED ${stop}`
					})

					refetcher.notifyMatchBlocked(match._id)
				})

				resolve()
			}
		})

		if (updates.matches.length !== 0 || updates.blocks.length !== 0) {
			refetcher.notifyAllMatches()
		}
	}
}
