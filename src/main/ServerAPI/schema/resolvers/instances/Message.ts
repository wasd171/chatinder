import { AbstractServerAPI, FormattedMessageType } from 'shared/definitions'
import { fromCallback } from 'shared/utils'
import { SUCCESS, PSEUDO } from 'shared/constants'
import { property } from 'lodash'

export const Message = {
	sentDate: property('sent_date'),
	status: async (
		message: FormattedMessageType,
		_args: {},
		ctx: AbstractServerAPI
	) => {
		if (message.status === SUCCESS || message.status === PSEUDO) {
			return message.status
		} else {
			const pending = (await fromCallback(callback =>
				ctx.db.pending.findOne({ _id: message._id }, callback)
			)) as FormattedMessageType
			return pending.status
		}
	}
}
