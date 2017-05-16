// @flow
import { ServerAPI } from 'main/ServerAPI'
import { normalizePerson, relogin } from '../utils'
import Promise from 'bluebird'

type Arguments = {
	id: string
}

export async function updatePerson(obj: any, args: Arguments, ctx: ServerAPI) {
	async function _updatePerson(callback: Function) {
		try {
			const person = await ctx.tinder.getPerson(args.id)
			callback(null, person)
		} catch (err) {
			await relogin(ctx)
			_updatePerson(callback)
		}
	}

	const person = await Promise.fromCallback(callback =>
		_updatePerson(callback)
	)
	const normalizedPerson = normalizePerson(person)

	await Promise.fromCallback(callback => {
		ctx.db.matches.update(
			{ 'person._id': args.id },
			{ $set: { person: normalizedPerson } },
			{},
			callback
		)
	})
	return normalizedPerson
}
