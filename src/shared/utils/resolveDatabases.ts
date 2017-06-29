import { resolveRoot } from './resolveRoot'
import { join } from 'path'

interface IOutput {
	extraFile: string
	matchesFile: string
	pendingFile: string
}

export function resolveDatabases(): IOutput {
	const dbBase = join(resolveRoot(), 'databases')

	const extraFile = join(dbBase, 'extra.db')
	const matchesFile = join(dbBase, 'matches.db')
	const pendingFile = join(dbBase, 'pending.db')

	return {
		extraFile,
		matchesFile,
		pendingFile
	}
}
