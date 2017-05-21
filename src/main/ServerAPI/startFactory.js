// @flow
import { ServerAPI } from './ServerAPI'
import { AppManager } from './AppManager'
import Bluebird from 'bluebird'
import { GRAPHQL } from 'shared/constants'
import { FB } from './FB'
import { TinderAPI } from './TinderAPI'
import { Refetcher } from './Refetcher'
import { ipcMain } from 'electron'
import { NotifierServer } from './NotifierServer'

export default function startFactory(instance: ServerAPI) {
	return async function start() {
		await instance.configureDatabases()

		const [fbParams, tinderParams] = await Promise.all([
			Bluebird.fromCallback(callback =>
				instance.db.extra.findOne({ _id: 'fb' }, callback)
			),
			Bluebird.fromCallback(callback =>
				instance.db.extra.findOne({ _id: 'tinder' }, callback)
			)
		])
		const fbProps = Object.assign({}, fbParams, { db: instance.db.extra })

		let lastActivityDate
		if (
			tinderParams != null &&
			tinderParams.lastActivityTimestamp != null
		) {
			lastActivityDate = new Date(tinderParams.lastActivityTimestamp)
		} else {
			lastActivityDate = new Date()
		}
		const tinderProps = { lastActivityDate, db: instance.db.extra }

		instance.fb = new FB(fbProps)
		instance.tinder = new TinderAPI(tinderProps)
		instance.app = new AppManager()
		instance.refetcher = new Refetcher(instance.app)
		instance.notifierServer = new NotifierServer(instance.app)

		ipcMain.on(GRAPHQL, instance.processRequest)
		await instance.app.start()
		instance.app.reload()
	}
}
