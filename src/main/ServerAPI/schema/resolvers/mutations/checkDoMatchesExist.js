// @flow
import {count, normalizeAllMatches, insert, relogin} from '../utils'
import Bluebird from 'bluebird'


export async function checkDoMatchesExist(obj, args, ctx) {
    const matchesCount = await count(ctx.db.matches, {});

    if (matchesCount !== 0) {
        return true
    } else {
        async function _getHistory(callback: Function) {
            try {
                const history = await ctx.tinder.getHistory();
                callback(null, history);
            } catch (err) {
                await relogin(ctx);
                _getHistory(callback);
            }
        }

        const history = await Bluebird.fromCallback(callback => _getHistory(callback));
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