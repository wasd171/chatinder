// @flow
import { resolve } from './resolve'

type Output = {
	extraFile: string,
	matchesFile: string,
	pendingFile: string
}

export function resolveDatabases(): Output {
	const require = { resolve }

	const extraFile = require.resolve('@databases/extra.db')
	const matchesFile = require.resolve('@databases/matches.db')
	const pendingFile = require.resolve('@databases/pending.db')

	return {
		extraFile,
		matchesFile,
		pendingFile
	}
}
