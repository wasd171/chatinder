import {
	AbstractServerAPI,
	AbstractAppManager,
	GetFBTokenType
} from '~/shared/definitions'
import { ipcMain, app } from 'electron'
import {
	IPC_GET_FB_TOKEN_REQ,
	IPC_GET_FB_TOKEN_RES,
	IPC_SHOW_WINDOW,
	IPC_LOGOUT
} from '~/shared/constants'
import getToken from './getToken'
import { AppManager } from './AppManager'

export class ServerAPI implements AbstractServerAPI {
	private app: AbstractAppManager = new AppManager()

	public start = async () => {
		ipcMain.on(IPC_GET_FB_TOKEN_REQ, this.getFBToken)
		ipcMain.on(IPC_SHOW_WINDOW, this.showWindow)
		ipcMain.on(IPC_LOGOUT, this.logout)
		await this.app.start()
		this.app.reload()
	}

	private async getFBToken(event: Electron.IpcMessageEvent, silent: boolean) {
		let res: GetFBTokenType
		try {
			res = await getToken(silent)
		} catch (err) {
			res = { err }
		}
		event.sender.send(IPC_GET_FB_TOKEN_RES, res)
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
