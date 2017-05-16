// @flow
import type { TinderAPI } from './TinderAPI'

export default function getPersonFactory(instance: TinderAPI) {
	return function getPerson(id: string) {
		return instance.client.getUser({ userId: id }).then(res => res.results)
	}
}
