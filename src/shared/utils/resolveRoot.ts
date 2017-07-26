import { app } from 'electron'
import isDev from 'electron-is-dev'

export function resolveRoot(): string {
	if (isDev) {
		return process.cwd()
	} else {
		return app.getAppPath()
	}
}
