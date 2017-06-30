import { resolveRoot } from './resolveRoot'
import { join } from 'path'

interface IOutput {
	extraFile: string
	matchesFile: string
	pendingFile: string
}

export function resolveDatabases(): IOutput {
	let dbBase: string
	if (process.env.NODE_ENV === 'development') {
		dbBase = join(resolveRoot(), 'databases')
	} else {
		dbBase = join(resolveRoot(), '..', 'databases')
	}

	const extraFile = join(dbBase, 'extra.db')
	const matchesFile = join(dbBase, 'matches.db')
	const pendingFile = join(dbBase, 'pending.db')

	return {
		extraFile,
		matchesFile,
		pendingFile
	}
}
