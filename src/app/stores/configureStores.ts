import { Navigator } from './Navigator'
import { Time } from './Time'
import { Caches } from './Caches'
import { Notifier } from './Notifier'
import { API } from './API'
import { TinderAPI } from './TinderAPI'
import { Storage } from './Storage'
import { State } from './State'
import { FB } from './FB'
import { MST_SNAPSHOT } from '~/shared/constants'
import { AbstractTinderAPISaved, AbstractFBSaved } from '~/shared/definitions'
import { onSnapshot } from 'mobx-state-tree'

async function getMSTSnapshot(storage: Storage) {
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

	return snapshot
}

async function getTinderSnapshot(storage: Storage) {
	const { lastActivityTimestamp } = (await storage.get(
		'tinder'
	)) as AbstractTinderAPISaved
	let lastActivityDate: Date
	if (lastActivityTimestamp != null) {
		lastActivityDate = new Date(lastActivityTimestamp)
	} else {
		lastActivityDate = new Date()
	}

	return { lastActivityDate }
}

function getFBSnapshot(storage: Storage): Promise<AbstractFBSaved> {
	return storage.get('fb')
}

export async function configureStores() {
	const storage = new Storage()
	const time = new Time()
	const navigator = new Navigator()
	const caches = new Caches()
	const notifier = new Notifier()

	const snapshot = await getMSTSnapshot(storage)
	const state = State.create(snapshot, { notifier })
	state.markAllPendingAsFailed()
	onSnapshot(state, snapshot => {
		storage.save(MST_SNAPSHOT, snapshot)
	})

	const tinderProps = await getTinderSnapshot(storage)
	const tinder = new TinderAPI({ storage, ...tinderProps })

	const fbProps = await getFBSnapshot(storage)
	const fb = new FB({ storage, ...fbProps })

	const api = new API({ state, tinder, fb })
	await navigator.start({ api })

	return { navigator, time, caches, api, state, fb }
}
