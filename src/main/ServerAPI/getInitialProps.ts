import { createSchema } from './schema'
import { resolveDatabases, fromCallback } from 'shared/utils'
import * as Nedb from 'nedb'
import { PENDING, FAILURE } from 'shared/constants'
import { FB } from './FB'
import { TinderAPI } from './TinderAPI'
import { AppManager } from './AppManager'
import { Refetcher } from './Refetcher'
import { NotifierServer } from './NotifierServer'
import { GraphQLSchema } from 'graphql'
import { AbstractFBSaved, AbstractTinderAPISaved } from 'shared/definitions'

export async function getInitialProps() {
	const schema = createSchema() as GraphQLSchema

	const { extraFile, matchesFile, pendingFile } = resolveDatabases()
	const extra = new Nedb({ filename: extraFile })
	const matches = new Nedb({ filename: matchesFile })
	const pending = new Nedb({ filename: pendingFile })
	const db = {
		extra,
		matches,
		pending
	}

	await Promise.all([
		fromCallback(callback => extra.loadDatabase(callback)),
		fromCallback(callback => matches.loadDatabase(callback)),
		fromCallback(callback => pending.loadDatabase(callback))
	])

	await fromCallback(callback =>
		pending.update(
			{ status: PENDING },
			{ $set: { status: FAILURE } },
			{ multi: true },
			callback
		)
	)

	const [fbParams, tinderParams] = (await Promise.all([
		fromCallback(callback => extra.findOne({ _id: 'fb' }, callback)),
		fromCallback(callback => extra.findOne({ _id: 'tinder' }, callback))
	])) as [AbstractFBSaved | null, AbstractTinderAPISaved | null]
	const fbProps = Object.assign({}, fbParams, { db: extra })

	let lastActivityDate
	if (tinderParams != null && tinderParams.lastActivityTimestamp != null) {
		lastActivityDate = new Date(tinderParams.lastActivityTimestamp)
	} else {
		lastActivityDate = new Date()
	}
	const tinderProps = { lastActivityDate, db: extra }

	const fb = new FB(fbProps)
	const tinder = new TinderAPI(tinderProps)
	const app = new AppManager()
	const refetcher = new Refetcher({ app })
	const notifierServer = new NotifierServer({ app })

	return {
		schema,
		db,
		fb,
		tinder,
		app,
		refetcher,
		notifierServer
	}
}
