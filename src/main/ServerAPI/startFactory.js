// @flow
import { ServerAPI } from './ServerAPI'
import { AppManager } from './AppManager'
import BPromise from 'bluebird'
import { GRAPHQL } from 'shared/constants'
import { FB } from './FB'
import { TinderAPI } from './TinderAPI'
import { Refetcher } from './Refetcher'
import { ipcMain } from 'electron'
import { NotifierServer } from './NotifierServer'

export default function startFactory(instance: ServerAPI) {
	return async function start() {
		await instance.configureDatabases()

		const fbParams = await BPromise.fromCallback(callback =>
			instance.db.extra.findOne({ _id: 'fb' }, callback)
		)
		const fbProps = Object.assign({}, fbParams, { db: instance.db.extra })

		instance.fb = new FB(fbProps)
		instance.tinder = new TinderAPI()
		instance.app = new AppManager()
		instance.refetcher = new Refetcher(instance.app)
		instance.notifierServer = new NotifierServer(instance.app)

		ipcMain.on(GRAPHQL, instance.processRequest)
		await instance.app.start()
		instance.app.reload()
	}
}
