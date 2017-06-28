import { success } from '../utils'
import { fromCallback } from 'shared/utils'
import { AbstractServerAPI } from 'shared/definitions'
import { app } from 'electron'

export function logout(_obj: undefined, _args: {}, ctx: AbstractServerAPI) {
	setTimeout(async () => {
		await Promise.all([
			ctx.app.logout(),
			fromCallback(callback =>
				ctx.db.matches.remove({}, { multi: true }, callback)
			),
			fromCallback(callback =>
				ctx.db.extra.remove({}, { multi: true }, callback)
			),
			fromCallback(callback =>
				ctx.db.pending.remove({}, { multi: true }, callback)
			)
		])
		app.relaunch()
		app.exit(0)
	}, 1000)
	return success
}
