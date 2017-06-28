import { AbstractAppManager } from 'shared/definitions'
import createWindowFactory from './createWindowFactory'
import installExtensions from './installExtensions'
import logoutFactory from './logoutFactory'
import reloadFactory from './reloadFactory'
import showFactory from './showFactory'
import startFactory from './startFactory'

export class AppManager extends AbstractAppManager
	implements AbstractAppManager {
	_window: Electron.BrowserWindow | null = null

	get window() {
		return this._window
	}

	start = startFactory(this)
	reload = reloadFactory(this)
	createWindow = createWindowFactory(this)
	show = showFactory(this)
	logout = logoutFactory(this)
	installExtensions = installExtensions

	constructor() {
		super()
		if (process.platform === 'darwin') {
			this.forceQuit = false
		} else {
			this.forceQuit = true
		}
	}
}
