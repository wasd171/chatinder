import { count, normalizeAllMatches, insert, relogin } from '../utils'
import { AbstractServerAPI, TinderHistoryType } from 'shared/definitions'

export async function checkDoMatchesExist(
	_obj: undefined,
	_args: {},
	ctx: AbstractServerAPI
) {
	const matchesCount = await count(ctx.db.matches, {})

	if (matchesCount !== 0) {
		return true
	} else {
		const history = (await new Promise(async resolve => {
			let resolved = false
			let history: TinderHistoryType | null = null

			while (!resolved || history === null) {
				try {
					history = await ctx.tinder.getHistory()
					resolved = true
				} catch (err) {
					await relogin(ctx)
				}
			}

			resolve(history)
		})) as TinderHistoryType

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
