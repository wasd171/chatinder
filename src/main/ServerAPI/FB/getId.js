// @flow
import fetch from 'node-fetch'
import { FB } from './FB'

export default function getId(instance: FB) {
	return async function() {
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

		return json.id
	}
}
