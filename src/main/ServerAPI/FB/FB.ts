import {
	AbstractFB,
	AbstractFBParams,
	AbstractFBSaved
} from '~/shared/definitions'
import getIdFactory from './getIdFactory'
import getToken from './getToken'
import loginForceFactory from './loginForceFactory'
import loginFactory from './loginFactory'
import { fromCallback } from '~/shared/utils'
import * as fs from 'fs'

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

		return fromCallback(callback =>
			fs.writeFile(this.fbPath, JSON.stringify(data), callback)
		)
	}

	clear = () => {
		return fromCallback(callback => fs.unlink(this.fbPath, callback))
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

	getId = getIdFactory(this)
	getToken = getToken
	loginForce = loginForceFactory(this)
	login = loginFactory(this)
}
