import { AbstractFB } from 'shared/definitions'

export default function loginForceFactory(instance: AbstractFB) {
	return async function loginForce(silent: boolean) {
		const { token, expiresIn } = await instance.getToken(silent)
		instance.setToken(token)
		instance.setExpiration(Date.now() + 1000 * expiresIn)
		const id = await instance.getId()
		instance.setId(id)
	}
}
