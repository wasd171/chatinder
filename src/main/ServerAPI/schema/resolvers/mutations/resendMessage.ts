import { AbstractServerAPI, TinderSendMessageType } from '~/shared/definitions'
import { fromCallback } from '~/shared/utils'
import { SUCCESS, FAILURE } from '~/shared/constants'

interface IArguments {
	id: string
	messageId: string
}

export async function resendMessage(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	const { id, messageId } = args
	const { matches, pending } = ctx.db
	// await Bluebird.delay(10000); //Just for UX, otherwise it's not clear that we have attempted to do a resend
	try {
		const rawMessage = (await fromCallback(callback =>
			pending.findOne({ _id: messageId }, callback)
		)) as TinderSendMessageType
		await ctx.tinder.sendMessage(id, rawMessage.message)
		await Promise.all([
			fromCallback(callback =>
				pending.remove({ _id: messageId }, {}, callback)
			),
			fromCallback(callback =>
				matches.update(
					{ _id: id },
					{
						$pull: {
							messages: {
								_id: messageId
							}
						}
					},
					{},
					callback
				)
			)
		])
		return {
			_id: messageId,
			status: SUCCESS
		}
	} catch (err) {
		return {
			_id: messageId,
			status: FAILURE
		}
	}
}
