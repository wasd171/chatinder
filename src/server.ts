import { app } from 'electron'
if (require('electron-squirrel-startup')) {
	app.quit()
}
import { ravenSetupMain } from './main/ravenSetupMain'
ravenSetupMain()

import { ServerAPI } from './main/ServerAPI'
const api = new ServerAPI()
api.start()
