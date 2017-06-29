import {
	AbstractFB,
	AbstractFBParams,
	FBSaveQueryType
} from '~/shared/definitions'
import getIdFactory from './getIdFactory'
import getToken from './getToken'
import loginForceFactory from './loginForceFactory'
import loginFactory from './loginFactory'
import { fromCallback } from '~/shared/utils'

export class FB extends AbstractFB implements AbstractFB {
	constructor(params: AbstractFBParams) {
		super()
		Object.assign(this, params)
	}

	save = (query: FBSaveQueryType) => {
		return fromCallback(callback =>
			this.db.update(
				{ _id: 'fb' },
				{ $set: query },
				{ upsert: true },
				callback
			)
		)
	}

	setToken = (token: string) => {
		this.token = token
		return this.save({ token })
	}

	setExpiration = (expiresAt: number) => {
		this.expiresAt = expiresAt
		return this.save({ expiresAt })
	}

	setId = (id: string) => {
		this.id = id
		return this.save({ id })
	}

	getId = getIdFactory(this)
	getToken = getToken
	loginForce = loginForceFactory(this)
	login = loginFactory(this)
}
