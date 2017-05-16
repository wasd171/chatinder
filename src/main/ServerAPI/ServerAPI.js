// @flow
import type { AppManager } from './AppManager'
import type { FB } from './FB'
import type { TinderAPI } from './TinderAPI'
import type { Refetcher } from './Refetcher'

import { createSchema } from './schema'
import Nedb from 'nedb'
import { resolveDatabases } from 'shared/utils'

import startFactory from './startFactory'
import callGraphQLFactory from './callGraphQLFactory'
import processRequestFactory from './processRequestFactory'
import generateMessage from './generateMessage'
import configureDatabasesFactory from './configureDatabasesFactory'

interface IDbStore {
	extra: Nedb,
	matches: Nedb,
	pending: Nedb
}

export class ServerAPI {
	app: AppManager
	schema: any
	db: IDbStore
	fb: FB
	tinder: TinderAPI
	refetcher: Refetcher
	reloginInterval: number | null = null
	reloginCallbacks: null | Array<Function> = null

	constructor() {
		this.schema = createSchema()

		const { extraFile, matchesFile, pendingFile } = resolveDatabases()
		const extra = new Nedb({ filename: extraFile })
		const matches = new Nedb({ filename: matchesFile })
		const pending = new Nedb({ filename: pendingFile })
		this.db = {
			extra,
			matches,
			pending
		}
	}

	start = startFactory(this)
	callGraphQL = callGraphQLFactory(this)
	processRequest = processRequestFactory(this)
	generateMessage = generateMessage
	configureDatabases = configureDatabasesFactory(this)
}
