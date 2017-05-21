// @flow
import type { TinderAPI } from './TinderAPI'

export default function getUpdatesFactory(instance: TinderAPI) {
	return async function getUpdates() {
		const updates = await instance.client.getUpdates()
		await instance.setLastActivityTimestamp({
			lastActivityDate: instance.client.lastActivity
		})
		return updates
	}
}
