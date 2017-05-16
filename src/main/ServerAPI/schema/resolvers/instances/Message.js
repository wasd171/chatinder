// @flow
import type { ServerAPI } from 'main/ServerAPI'
import Bluebird from 'bluebird'
import { SUCCESS, PSEUDO } from 'shared/constants'
import { property } from 'lodash'

export const Message = {
	sentDate: property('sent_date'),
	status: async (message, args, ctx: ServerAPI) => {
		if (message.status === SUCCESS || message.status === PSEUDO) {
			return message.status
		} else {
			const pending = await Bluebird.fromCallback(callback =>
				ctx.db.pending.findOne({ _id: message._id }, callback)
			)
			return pending.status
		}
	}
}
