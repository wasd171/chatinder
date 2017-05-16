// @flow
import type { TinderAPI } from './TinderAPI'

export default function getHistoryFactory(instance: TinderAPI) {
	return function getHistory() {
		return instance.client.getHistory()
	}
}
