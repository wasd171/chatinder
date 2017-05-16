// @flow
import Promise from 'bluebird'

export function match(obj, args, ctx) {
	return Promise.fromCallback(callback =>
		ctx.db.matches.findOne({ _id: args.id }, callback)
	)
}
