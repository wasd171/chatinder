// @flow
import Promise from 'bluebird'


export function matches(obj, args, ctx) {
    return Promise.fromCallback(callback => ctx.db.matches.find({}, callback))
}