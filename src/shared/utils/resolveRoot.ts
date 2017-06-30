import { app } from 'electron'

export function resolveRoot(): string {
	if (process.env.NODE_ENV !== 'production') {
		return process.cwd()
	} else {
		return app.getAppPath()
	}
}
