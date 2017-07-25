import { success } from '~/shared/constants'
import { AbstractServerAPI } from '~/shared/definitions'
import { app } from 'electron'

export async function logout(
	_obj: undefined,
	_args: {},
	ctx: AbstractServerAPI
) {
	await Promise.all([ctx.app.logout(), ctx.fb.clear()])
	app.relaunch()
	app.exit(0)
	return success
}
