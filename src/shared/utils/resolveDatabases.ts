import { resolveRoot } from './resolveRoot'
import { join } from 'path'

export function resolveDatabases() {
	if (process.env.NODE_ENV === 'development') {
		return join(resolveRoot(), 'databases')
	} else {
		return join(resolveRoot(), '..', 'databases')
	}
}
