// @flow
import { success } from '../utils'
import Bluebird from 'bluebird'
import type { ServerAPI } from 'main/ServerAPI'
import { app } from 'electron'

export async function logout(obj, args, ctx: ServerAPI) {
	await Bluebird.all([
		// ctx.fb.setToken(null),
		// ctx.fb.setId(null),
		// ctx.fb.setExpiration(null),
		// ctx.tinder.resetClient(),
		ctx.app.logout(),
		Bluebird.fromCallback(callback =>
			ctx.db.matches.remove({}, { multi: true }, callback)
		),
		Bluebird.fromCallback(callback =>
			ctx.db.extra.remove({}, { multi: true }, callback)
		),
		Bluebird.fromCallback(callback =>
			ctx.db.pending.remove({}, { multi: true }, callback)
		)
	])
	app.relaunch()
	app.exit(0)
	return success
}
