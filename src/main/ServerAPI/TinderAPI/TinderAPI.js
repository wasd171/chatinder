// @flow
// import {TinderClient} from 'tinder'
import TinderClient from 'tinder-modern'
import isAuthorizedFactory from './isAuthorizedFactory'
import getDefaultsFactory from './getDefaultsFactory'
import getProfileFactory from './getProfileFactory'
import authorizeFactory from './authorizeFactory'
import getHistoryFactory from './getHistoryFactory'
import sendMessageFactory from './sendMessageFactory'
import getPersonFactory from './getPersonFactory'
import getUpdatesFactory from './getUpdatesFactory'

type Interval = number | null

export class TinderAPI {
	client: TinderClient
	subscriptionInterval: Interval = null
	subscriptionPromise: null | Promise<any> = null
	authPromise: Promise<true> | null = null
	authPromiseExternalResolve: null | ((arg: true) => void) = null

	constructor() {
		this.resetClient()
	}

	resetClient = () => {
		this.client = new TinderClient()
	}

	isAuthorized = isAuthorizedFactory(this)
	getDefaults = getDefaultsFactory(this)
	getProfile = getProfileFactory(this)
	authorize = authorizeFactory(this)
	getHistory = getHistoryFactory(this)
	sendMessage = sendMessageFactory(this)
	getPerson = getPersonFactory(this)
	getUpdates = getUpdatesFactory(this)
}
