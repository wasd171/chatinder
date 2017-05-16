// @flow
import type { ServerAPI } from 'main/ServerAPI'
import { relogin } from './relogin'

export function getUpdatesFactory({
	ctx,
	handler
}: {
	ctx: ServerAPI,
	handler: Function
}) {
	return async function getUpdates(): Promise<void> {
		const { tinder } = ctx

		if (!tinder.subscriptionPending) {
			tinder.subscriptionPending = true

			const updates = await new Promise(async resolve => {
				let resolved = false
				let updates

				while (!resolved) {
					try {
						updates = await tinder.getUpdates()
						resolved = true
					} catch (err) {
						await relogin(ctx)
					}
				}

				tinder.subscriptionPending = false
				resolve(updates)
			})

			handler(updates)
		}
	}
}
