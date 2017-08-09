import {
	AbstractFB,
	AbstractFBParams,
	AbstractFBSaved,
	IGetFBTokenFailure,
	IGetFBTokenSuccess,
	GetFBTokenType
} from '~/shared/definitions'
import fetch from 'node-fetch'
import { ipcRenderer } from 'electron'
import { IPC_GET_FB_TOKEN_REQ, IPC_GET_FB_TOKEN_RES } from '~/shared/constants'
// import getIdFactory from './getIdFactory'
// import getToken from './getToken'
// import loginForceFactory from './loginForceFactory'
// import loginFactory from './loginFactory'
// import { fromCallback } from '~/shared/utils'
// import * as fs from 'fs'

export class FB extends AbstractFB implements AbstractFB {
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
		// return fromCallback(callback =>
		// 	fs.writeFile(this.fbPath, JSON.stringify(data), callback)
		// )
	}

	clear = () => {
		return this.storage.save('fb', {})
		// return fromCallback(callback => fs.unlink(this.fbPath, callback))
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
	// getId = getIdFactory(this)
	// getToken = getToken
	getToken = (silent: boolean) => {
		const promise = new Promise<IGetFBTokenSuccess>((resolve, reject) => {
			ipcRenderer.once(
				IPC_GET_FB_TOKEN_RES,
				(_event: Electron.IpcMessageEvent, res: GetFBTokenType) => {
					const { err } = res as IGetFBTokenFailure
					if (err) {
						reject(err)
					} else {
						resolve(res as IGetFBTokenSuccess)
					}
				}
			)
		})
		ipcRenderer.send(IPC_GET_FB_TOKEN_REQ, silent)
		return promise
	}

	// loginForce = loginForceFactory(this)
	loginForce = async (silent: boolean) => {
		const { token, expiresIn } = await this.getToken(silent)
		this.setToken(token)
		this.setExpiration(Date.now() + 1000 * expiresIn)
		const id = await this.getId()
		this.setId(id)
	}

	// login = loginFactory(this)
	login = async (silent: boolean) => {
		try {
			await this.getId()
		} catch (err) {
			return this.loginForce(silent)
		}
	}
}
