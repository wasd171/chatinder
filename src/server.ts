import { app } from 'electron'
if (require('electron-squirrel-startup')) {
	app.quit()
}
import { ravenSetupMain } from './main/ravenSetupMain'
ravenSetupMain()

import { ServerAPI } from './main/ServerAPI'

async function main() {
	const params = await ServerAPI.getInitialProps()
	const api = new ServerAPI(params)
	api.start()
}

main()
