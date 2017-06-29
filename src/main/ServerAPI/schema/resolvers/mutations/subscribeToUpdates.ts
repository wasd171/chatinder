import { AbstractServerAPI } from '~/shared/definitions'
import { success, getUpdatesFactory, handleUpdatesFactory } from '../utils'
import { relogin } from '../utils'

export async function subscribeToUpdates(
	_obj: undefined,
	_args: {},
	ctx: AbstractServerAPI
) {
	const { tinder } = ctx
	const handler = handleUpdatesFactory(ctx)
	const getUpdates = getUpdatesFactory({ ctx, handler })

	if (tinder.subscriptionInterval !== null) {
		clearInterval(tinder.subscriptionInterval)
		tinder.subscriptionInterval = null
	}

	let defaults = tinder.getDefaults()
	while (defaults === null) {
		await relogin(ctx)
		defaults = tinder.getDefaults()
	}

	const interval = defaults.globals.updates_interval
	tinder.subscriptionInterval = setInterval(getUpdates, interval)

	return success
}
