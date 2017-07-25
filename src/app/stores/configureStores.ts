import { Navigator } from './Navigator'
import { Time } from './Time'
import { Caches } from './Caches'
import { Notifier } from './Notifier'
import { API } from './API'
import { TinderAPI } from './TinderAPI'
import { ApolloClient } from 'apollo-client'
import { Storage } from './Storage'
import { State } from './State'
import { MST_SNAPSHOT } from '~/shared/constants'
import { AbstractTinderAPISaved } from '~/shared/definitions'
import { onSnapshot } from 'mobx-state-tree'

export async function configureStores(client: ApolloClient) {
	const storage = new Storage()
	const time = new Time()
	const navigator = new Navigator()
	const caches = new Caches()
	const notifier = new Notifier()

	const snapshot = (await storage.get(MST_SNAPSHOT)) as any
	if (snapshot.matches == null) {
		snapshot.matches = {}
	}
	if (snapshot.pendingMessages == null) {
		snapshot.pendingMessages = {}
	}
	if (snapshot.sentMessages == null) {
		snapshot.sentMessages = {}
	}
	const state = State.create(snapshot, { notifier })
	state.markAllPendingAsFailed()
	onSnapshot(state, snapshot => {
		storage.save(MST_SNAPSHOT, snapshot)
	})

	const { lastActivityTimestamp } = (await storage.get(
		'tinder'
	)) as AbstractTinderAPISaved
	let lastActivityDate: Date
	if (lastActivityTimestamp != null) {
		lastActivityDate = new Date(lastActivityTimestamp)
	} else {
		lastActivityDate = new Date()
	}
	const tinder = new TinderAPI({ storage, lastActivityDate })

	const api = new API({ client, state, tinder })
	await navigator.start({ api })

	return { navigator, time, caches, api, state }
}
