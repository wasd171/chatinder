import { AbstractFB } from '~/shared/definitions'

export default function loginFactory(instance: AbstractFB) {
	return async function login(silent: boolean) {
		try {
			await instance.getId()
		} catch (err) {
			return instance.loginForce(silent)
		}
	}
}
