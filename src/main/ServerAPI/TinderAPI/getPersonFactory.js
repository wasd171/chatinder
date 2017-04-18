// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'


export default function getPersonFactory(instance: TinderAPI) {
	return function getPerson(id: string) {
		return Promise.fromCallback(callback => instance.client.getUser(id, callback)).then(res => res.results)
	}
}