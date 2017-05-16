// @flow
import type { TinderAPI } from './TinderAPI'

export default function isAuthorizedFactory(instance: TinderAPI) {
	return async function isAuthorized() {
		try {
			await instance.getProfile()
			return true
		} catch (err) {
			// console.error(err);
			return false
		}
	}
}
