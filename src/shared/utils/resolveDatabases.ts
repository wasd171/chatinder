import { resolveRoot } from './resolveRoot'
import { join } from 'path'
import * as fs from 'fs'

export function resolveDatabases() {
	let databasesFolder: string
	if (process.env.NODE_ENV === 'development') {
		databasesFolder = join(resolveRoot(), 'databases')
	} else {
		databasesFolder = join(resolveRoot(), '..', 'databases')
	}

	if (!fs.existsSync(databasesFolder)) {
		fs.mkdirSync(databasesFolder)
	}

	return databasesFolder
}
