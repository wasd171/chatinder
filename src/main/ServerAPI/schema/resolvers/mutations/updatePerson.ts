import { AbstractServerAPI, TinderPersonType } from '~/shared/definitions'
import { normalizePerson, relogin } from '../utils'
import { fromCallback } from '~/shared/utils'

interface IArguments {
	id: string
}

export async function updatePerson(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	let person: TinderPersonType | null = null

	while (person === null) {
		try {
			person = await ctx.tinder.getPerson(args.id)
		} catch (err) {
			await relogin(ctx)
		}
	}

	const normalizedPerson = normalizePerson(person)

	await fromCallback(callback => {
		ctx.db.matches.update(
			{ 'person._id': args.id },
			{ $set: { person: normalizedPerson } },
			{},
			callback
		)
	})
	return normalizedPerson
}
