import { AbstractAppManager } from 'shared/definitions'

export default function reloadFactory(instance: AbstractAppManager) {
	return function reload() {
		const url = `file://${__dirname}/../../../index.html`
		if (instance.window !== null) {
			instance.window.loadURL(url)
		}
	}
}
