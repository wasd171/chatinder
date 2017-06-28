import { AbstractServerAPI, TinderHistoryType } from 'shared/definitions'
import { relogin } from './relogin'

export function getUpdatesFactory({
	ctx,
	handler
}: {
	ctx: AbstractServerAPI
	handler: (updates: TinderHistoryType) => Promise<void>
}) {
	return async function getUpdates(): Promise<void> {
		const { subscriptionPromise, getUpdates } = ctx.tinder

		if (subscriptionPromise === null) {
			ctx.tinder.subscriptionPromise = new Promise(async resolve => {
				let resolved = false
				let updates: TinderHistoryType | null = null

				while (!resolved || updates === null) {
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
			ctx.tinder.subscriptionPromise = null
			handler(updates)
		}
	}
}
