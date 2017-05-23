// @flow
import startFactory from './startFactory'
import reloadFactory from './reloadFactory'
import createWindowFactory from './createWindowFactory'
import showFactory from './showFactory'
import logoutFactory from './logoutFactory'
import installExtensions from './installExtensions'

export class AppManager {
	_window
	forceQuit
	updateAvailable = false

	get window() {
		return this._window
	}

	constructor() {
		if (process.platform === 'darwin') {
			this.forceQuit = false
		} else {
			this.forceQuit = true
		}
	}

	start = startFactory(this)
	reload = reloadFactory(this)
	createWindow = createWindowFactory(this)
	show = showFactory(this)
	logout = logoutFactory(this)
	installExtensions = installExtensions
}
