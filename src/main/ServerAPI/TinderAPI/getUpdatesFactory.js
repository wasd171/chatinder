// @flow
import type { TinderAPI } from './TinderAPI'

export default function getUpdatesFactory(instance: TinderAPI) {
	return function getUpdates() {
		return instance.client.getUpdates()
	}
}
