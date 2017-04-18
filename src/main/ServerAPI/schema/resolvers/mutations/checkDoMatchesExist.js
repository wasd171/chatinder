// @flow
import Promise from 'bluebird'
import {normalizeMatch} from '../utils'


export async function checkDoMatchesExist(obj, args, ctx) {
    const count = await Promise.fromCallback(callback => ctx.db.matches.count({}, callback));
    if (count !== 0) {
        return true
    } else {
        const history = await ctx.tinder.getHistory();
        if (history.matches.length === 0) {
            return false
        } else {
            const matches = history.matches.map(normalizeMatch);
            await Promise.fromCallback(callback => ctx.db.matches.insert(matches, callback));
            return true
        }
    }
}