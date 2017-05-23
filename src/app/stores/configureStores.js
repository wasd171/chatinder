import { Navigator } from './Navigator'
import { Time } from './Time'
import { Caches } from './Caches'
import { NotifierClient } from './NotifierClient'

export async function configureStores(client) {
	const time = new Time()
	const navigator = new Navigator()
	const caches = new Caches()
	const notifierClient = new NotifierClient()
	await navigator.start({ client })

	return { navigator, time, caches, notifierClient }
}
