// @flow
import startFactory from './startFactory'
import reloadFactory from './reloadFactory'
import createWindowFactory from './createWindowFactory'
import showFactory from './showFactory'
import logoutFactory from './logoutFactory'
import installExtensions from './installExtensions'

export class AppManager {
	_window

	get window() {
		return this._window
	}

	start = startFactory(this)
	reload = reloadFactory(this)
	createWindow = createWindowFactory(this)
	show = showFactory(this)
	logout = logoutFactory(this)
	installExtensions = installExtensions
}
