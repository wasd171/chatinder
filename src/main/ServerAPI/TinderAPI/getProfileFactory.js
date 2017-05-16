// @flow
import type { TinderAPI } from './TinderAPI'

export default function getProfileFactory(instance: TinderAPI) {
	return function getProfile() {
		return instance.client.getAccount()
	}
}
