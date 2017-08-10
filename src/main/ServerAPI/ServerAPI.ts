import { AbstractServerAPI, AbstractAppManager } from '~/shared/definitions'
import { ipcMain, app } from 'electron'
import { IPC_SHOW_WINDOW, IPC_LOGOUT } from '~/shared/constants'
import { AppManager } from './AppManager'

export class ServerAPI implements AbstractServerAPI {
	private app: AbstractAppManager = new AppManager()

	public start = async () => {
		ipcMain.on(IPC_SHOW_WINDOW, this.showWindow)
		ipcMain.on(IPC_LOGOUT, this.logout)
		await this.app.start()
		this.app.reload()
	}

	private showWindow = () => {
		this.app.show()
	}

	private logout = async () => {
		await this.app.logout()
		app.relaunch()
		app.exit(0)
	}
}
