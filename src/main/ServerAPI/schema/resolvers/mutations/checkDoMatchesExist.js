// @flow
import { count, normalizeAllMatches, insert, relogin } from '../utils'

export async function checkDoMatchesExist(obj, args, ctx) {
	const matchesCount = await count(ctx.db.matches, {})

	if (matchesCount !== 0) {
		return true
	} else {
		const history = await new Promise(async resolve => {
			let resolved = false
			let history

			while (!resolved) {
				try {
					history = await ctx.tinder.getHistory()
					resolved = true
				} catch (err) {
					await relogin(ctx)
				}
			}

			resolve(history)
		})

		if (history.matches.length === 0) {
			return false
		} else {
			const matches = normalizeAllMatches(history.matches)
			if (matches.length !== 0) {
				await insert(ctx.db.matches, matches)
				return true
			} else {
				return false
			}
		}
	}
}
