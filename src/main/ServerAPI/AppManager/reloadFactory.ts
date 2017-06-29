import { AbstractAppManager } from '~/shared/definitions'
import { resolveRoot } from '~/shared/utils'

export default function reloadFactory(instance: AbstractAppManager) {
	return function reload() {
		const url = `file://${resolveRoot()}/dist/index.html`
		if (instance.window !== null) {
			instance.window.loadURL(url)
		}
	}
}
