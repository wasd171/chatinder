// @flow
import {count, normalizeAllMatches, insert} from '../utils'


export async function checkDoMatchesExist(obj, args, ctx) {
    const matchesCount = await count(ctx.db.matches, {});

    if (matchesCount !== 0) {
        return true
    } else {
        const history = await ctx.tinder.getHistory();
        if (history.matches.length === 0) {
            return false
        } else {
            const matches = normalizeAllMatches(history.matches);
            if (matches.length !== 0) {
                await insert(ctx.db.matches, matches);
                return true
            } else {
                return false
            }
        }
    }
}