import { AbstractAppManager } from '~/shared/definitions'
import { fromCallback } from '~/shared/utils'

export default function logoutFactory(instance: AbstractAppManager) {
	return async function logout() {
		if (instance._window !== null) {
			const { session } = instance._window.webContents
			await fromCallback(callback =>
				session.clearCache(() => callback(null))
			)

			await fromCallback(callback =>
				session.clearStorageData(undefined, callback)
			)

			instance._window.destroy()
			instance._window = null
		} else {
			throw new Error('Window was undefined when trying to log out')
		}
	}
}
