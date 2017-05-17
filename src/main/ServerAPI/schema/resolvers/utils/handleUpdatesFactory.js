// @flow
import { ServerAPI } from 'main/ServerAPI'
import Bluebird from 'bluebird'
import { normalizeMatch } from './normalizeMatch'
import { normalizeMessage } from 'shared/utils'

export function handleUpdatesFactory(ctx: ServerAPI) {
	return async function handleUpdates(updates: any): Promise<void> {
		const { refetcher, db, notifierServer } = ctx

		await Promise.all(
			updates.matches.map(async match => {
				const query = { _id: match._id }
				const oldMatch = await Bluebird.fromCallback(callback =>
					db.matches.findOne(query, {}, callback)
				)
				if (!oldMatch) {
					const newMatch = normalizeMatch(match)
					await Bluebird.fromCallback(callback =>
						db.matches.insert(newMatch, callback)
					)
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
				} else {
					let formattedMessages, modifier

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

					await Bluebird.fromCallback(callback =>
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

				const matches = await Bluebird.fromCallback(callback =>
					db.matches.find(query, options, callback)
				)

				await Bluebird.fromCallback(callback =>
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
