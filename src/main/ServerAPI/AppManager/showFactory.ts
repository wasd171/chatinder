import { AbstractAppManager } from 'shared/definitions'

export default function showFactory(instance: AbstractAppManager) {
	return function show() {
		if (instance.window !== null) {
			instance.window.show()
			instance.window.focus()
		}
	}
}
