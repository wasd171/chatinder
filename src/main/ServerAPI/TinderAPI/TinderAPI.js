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
import Bluebird from 'bluebird'

type Interval = number | null

export class TinderAPI {
	client: TinderClient
	subscriptionInterval: Interval = null
	subscriptionPromise: null | Promise<any> = null
	authPromise: Promise<true> | null = null
	authPromiseExternalResolve: null | ((arg: true) => void) = null
	lastActivityDate
	db

	constructor({ lastActivityDate, db }) {
		Object.assign(this, { lastActivityDate, db })
		this.resetClient()
	}

	resetClient = () => {
		this.client = new TinderClient({
			lastActivityDate: this.lastActivityDate
		})
	}

	setLastActivityTimestamp = async ({ lastActivityDate }) => {
		this.lastActivityDate = lastActivityDate
		return Bluebird.fromCallback(callback =>
			this.db.update(
				{ _id: 'tinder' },
				{
					$set: {
						lastActivityTimestamp: this.lastActivityDate.getTime()
					}
				},
				{ upsert: true },
				callback
			)
		)
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
