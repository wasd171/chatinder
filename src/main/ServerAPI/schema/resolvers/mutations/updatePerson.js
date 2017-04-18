// @flow
import {ServerAPI} from '~/main/ServerAPI'
import {normalizePerson} from '../utils'
import Promise from 'bluebird'


type Arguments = {
	id: string
}


export async function updatePerson(obj: any, args: Arguments, ctx: ServerAPI) {
	const person = await ctx.tinder.getPerson(args.id);
	const normalizedPerson = normalizePerson(person);
	console.log(normalizedPerson);

	await Promise.fromCallback(callback => {
		ctx.db.matches.update(
			{'person._id': args.id},
			{$set: {person: normalizedPerson}},
			{},
			callback
		)
	});
	return normalizedPerson
}