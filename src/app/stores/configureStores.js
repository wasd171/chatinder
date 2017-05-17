import { Navigator } from './Navigator'
import { View } from './View'
import { Time } from './Time'
import { Caches } from './Caches'
import { NotifierClient } from './NotifierClient'

export async function configureStores(client) {
	const time = new Time()
	const view = new View()
	const navigator = new Navigator()
	const caches = new Caches()
	const notifierClient = new NotifierClient()
	await navigator.start({ view, client })

	return { view, navigator, time, caches, notifierClient }
}
