import { app } from 'electron'
if (require('electron-squirrel-startup')) {
	app.quit()
}
import { ravenSetupMain } from './main/ravenSetupMain'
ravenSetupMain()

import { resolveDatabases } from '~/shared/utils'
const path = resolveDatabases()
throw new Error(path)

import { ServerAPI } from './main/ServerAPI'

async function main() {
	const params = await ServerAPI.getInitialProps()
	const api = new ServerAPI(params)
	api.start()
}

main()
