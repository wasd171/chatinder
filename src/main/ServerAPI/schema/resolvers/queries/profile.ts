import {
	AbstractServerAPI,
	ITinderProfile,
	TinderProfileUserType
} from '~/shared/definitions'
import { fromCallback } from '~/shared/utils'
import { normalizePerson, relogin } from '../utils'

export interface IArguments {}

export async function profile(
	_obj: undefined,
	_args: IArguments,
	ctx: AbstractServerAPI
) {
	let profile = (await fromCallback(callback =>
		ctx.db.extra.findOne({ _id: 'profile', recent: true }, callback)
	)) as ITinderProfile | null
	if (profile !== null) {
		return profile
	} else {
		profile = (await new Promise(async resolve => {
			let resolved = false
			let profile: ITinderProfile | null = null

			while (!resolved || profile === null) {
				try {
					profile = await ctx.tinder.getProfile()
					resolved = true
				} catch (err) {
					await relogin(ctx)
				}
			}

			resolve(profile)
		})) as ITinderProfile

		profile = Object.assign({ _id: 'profile', recent: true }, profile)
		profile.user = normalizePerson(profile.user) as TinderProfileUserType
		await fromCallback(callback =>
			ctx.db.extra.remove({ _id: 'profile' }, {}, callback)
		)
		await fromCallback(callback => ctx.db.extra.insert(profile, callback))
		return profile
	}
}
