import { AbstractServerAPI } from 'shared/definitions'
import { profile } from '../queries'
import { fromCallback } from 'shared/utils'

export async function updateProfile(
	obj: undefined,
	args: {},
	ctx: AbstractServerAPI
) {
	await fromCallback(callback =>
		ctx.db.extra.update(
			{ _id: 'profile' },
			{ $set: { recent: false } },
			{},
			callback
		)
	)
	return profile(obj, args, ctx)
}
