import { resolveRoot } from './resolveRoot'
import { join } from 'path'
import * as fs from 'fs'
import isDev from 'electron-is-dev'

export function resolveDatabases() {
	let databasesFolder: string
	if (isDev) {
		databasesFolder = join(resolveRoot(), 'databases')
	} else {
		databasesFolder = join(resolveRoot(), '..', 'databases')
	}

	if (!fs.existsSync(databasesFolder)) {
		fs.mkdirSync(databasesFolder)
	}

	return databasesFolder
}
