import {
	AbstractFB,
	AbstractFBParams,
	AbstractFBSaved,
	FBGetTokenType
} from '~/shared/definitions'
import fetch from 'node-fetch'
import FbWebView from '~/app/scenes/App/components/FBWebView'

export class FB extends AbstractFB implements AbstractFB {
	private component?: FbWebView

	constructor(params: AbstractFBParams) {
		super()
		Object.assign(this, params)
	}

	save = () => {
		const data: AbstractFBSaved = {
			token: this.token,
			expiresAt: this.expiresAt,
			id: this.id
		}

		return this.storage.save('fb', data)
	}

	clear = () => {
		return this.storage.save('fb', {})
	}

	setToken = (token: string) => {
		this.token = token
		return this.save()
	}

	setExpiration = (expiresAt: number) => {
		this.expiresAt = expiresAt
		return this.save()
	}

	setId = (id: string) => {
		this.id = id
		return this.save()
	}

	getId = async () => {
		if (typeof this.token === 'undefined') {
			throw new Error('fb token is not present!')
		}

		if (this.expiresAt === undefined || this.expiresAt <= Date.now()) {
			throw new Error('fb token has expired!')
		}

		const res = await fetch(
			`https://graph.facebook.com/me?fields=id&access_token=${this.token}`
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

	getToken = (silent: boolean) => {
		return new Promise<FBGetTokenType>((resolve, reject) => {
			if (!this.component) {
				reject('Not possible to get token without component')
			} else {
				this.component.getToken({ silent, resolve, reject })
			}
		})
	}

	loginForce = async (silent: boolean) => {
		const { token, expiresIn } = await this.getToken(silent)
		this.setToken(token)
		this.setExpiration(Date.now() + 1000 * expiresIn)
		const id = await this.getId()
		this.setId(id)
	}

	login = async (silent: boolean) => {
		try {
			await this.getId()
		} catch (err) {
			return this.loginForce(silent)
		}
	}

	setComponent = (component: FbWebView) => {
		this.component = component
	}
}
