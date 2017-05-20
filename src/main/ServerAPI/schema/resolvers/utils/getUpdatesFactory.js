// @flow
import type { ServerAPI } from 'main/ServerAPI'
import { relogin } from './relogin'
import Bluebird from 'bluebird'

export function getUpdatesFactory({
	ctx,
	handler
}: {
	ctx: ServerAPI,
	handler: Function
}) {
	return async function getUpdates(): Promise<void> {
		const { subscriptionPromise, getUpdates } = ctx.tinder

		if (subscriptionPromise === null || subscriptionPromise.isFulfilled()) {
			ctx.tinder.subscriptionPromise = new Bluebird(async resolve => {
				let resolved = false
				let updates

				while (!resolved) {
					try {
						updates = await getUpdates()
						resolved = true
					} catch (err) {
						await relogin(ctx)
					}
				}

				resolve(updates)
			})

			const updates = await ctx.tinder.subscriptionPromise
			handler(updates)
		}
	}
}
