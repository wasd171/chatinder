export function resolveRoot(): string {
	const { path } = require('app-root-path')
	return path
}
