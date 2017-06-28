import { AbstractFB } from 'shared/definitions'
import fetch from 'node-fetch'

export default function getIdFactory(instance: AbstractFB) {
	return async function getId() {
		if (typeof instance.token === 'undefined') {
			throw new Error('fb token is not present!')
		}

		if (
			instance.expiresAt === undefined ||
			instance.expiresAt <= Date.now()
		) {
			throw new Error('fb token has expired!')
		}

		const res = await fetch(
			`https://graph.facebook.com/me?fields=id&access_token=${instance.token}`
		)
		const json = await res.json()
		if (json.error) {
			throw new Error(json.error)
		}
		if (!res.ok) {
			throw new Error(`request failed with status ${res.status}`)
		}

		return json.id as string
	}
}
