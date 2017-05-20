// @flow
import { NOTIFICATION } from 'shared/constants'
import { AppManager } from '../AppManager'

export class NotifierServer {
	app: AppManager

	constructor(app: AppManager) {
		this.app = app
	}

	notify({ title, body }: { title: string, body: string }) {
		this.app.window.webContents.send(NOTIFICATION, { title, body })
	}
}
