// @flow
import type { TinderAPI } from './TinderAPI'

export default function getDefaultsFactory(instance: TinderAPI) {
	return function getDefaults() {
		return instance.client.getDefaults()
	}
}
