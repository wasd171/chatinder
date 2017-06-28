import {
	AbstractServerAPI,
	FormattedMatchType,
	TinderSendMessageType,
	FormattedMessageType
} from 'shared/definitions'
import { FAILURE } from 'shared/constants'
import { fromCallback, normalizeMessagePair } from 'shared/utils'

interface IArguments {
	id: string
	rawMessage: {
		_id: string
		from: string
		sent_date: string
		message: string
		status: string
	}
}

export async function sendMessage(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	const { matches, pending } = ctx.db
	const { rawMessage, id } = args
	let match: FormattedMatchType

	match = (await fromCallback(callback =>
		matches.findOne({ _id: id }, callback)
	)) as FormattedMatchType
	const formattedMessage: TinderSendMessageType = {
		...rawMessage,
		to: id,
		match_id: match._id,
		created_date: new Date().toISOString()
	}

	let optimisticMessage: FormattedMessageType
	if (match.messages.length === 0) {
		optimisticMessage = normalizeMessagePair(formattedMessage)
	} else {
		optimisticMessage = normalizeMessagePair(
			formattedMessage,
			match.messages[match.messages.length - 1]
		)
	}

	await Promise.all([
		fromCallback(callback => pending.insert(rawMessage, callback)),
		fromCallback(callback =>
			matches.update(
				{ _id: id },
				{
					$push: { messages: optimisticMessage }
				},
				{},
				callback
			)
		)
	])

	try {
		const message = await ctx.tinder.sendMessage(id, rawMessage.message)
		await Promise.all([
			fromCallback(callback =>
				pending.remove({ _id: rawMessage._id }, {}, callback)
			),
			fromCallback(callback =>
				matches.update(
					{ _id: id },
					{
						$pull: {
							messages: {
								_id: rawMessage._id
							}
						}
					},
					{},
					callback
				)
			)
		])

		match = (await fromCallback(callback =>
			matches.findOne({ _id: id }, callback)
		)) as FormattedMatchType
		if (match.messages.length === 0) {
			optimisticMessage = normalizeMessagePair(message)
		} else {
			optimisticMessage = normalizeMessagePair(
				message,
				match.messages[match.messages.length - 1]
			)
		}
		return optimisticMessage
	} catch (err) {
		await fromCallback(callback =>
			pending.update(
				{ _id: rawMessage._id },
				{ $set: { status: FAILURE } },
				{},
				callback
			)
		)

		optimisticMessage.status = FAILURE
		return optimisticMessage
	}
}
