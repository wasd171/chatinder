// @flow
import Bluebird from 'bluebird'
import { normalizePerson, relogin } from '../utils'

export async function profile(obj, args, ctx) {
	let profile = await Bluebird.fromCallback(callback =>
		ctx.db.extra.findOne({ _id: 'profile', recent: true }, callback)
	)
	if (profile !== null) {
		return profile
	} else {
		profile = await new Promise(async resolve => {
			let resolved = false
			let profile

			while (!resolved) {
				try {
					profile = await ctx.tinder.getProfile()
					resolved = true
				} catch (err) {
					await relogin(ctx)
				}
			}

			resolve(profile)
		})

		profile = Object.assign({ _id: 'profile', recent: true }, profile)
		profile.user = normalizePerson(profile.user)
		await Bluebird.fromCallback(callback =>
			ctx.db.extra.remove({ _id: 'profile' }, {}, callback)
		)
		await Bluebird.fromCallback(callback =>
			ctx.db.extra.insert(profile, callback)
		)
		return profile
	}
}
