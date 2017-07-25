import { createSchema } from './schema'
import { resolveDatabases, fromCallback } from '~/shared/utils'
import * as Nedb from 'nedb'
import { PENDING, FAILURE } from '~/shared/constants'
import { FB } from './FB'
import { AppManager } from './AppManager'
import { AbstractFBSaved, AbstractTinderAPISaved } from '~/shared/definitions'

export async function getInitialProps() {
	const schema = createSchema()

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

	const fb = new FB(fbProps)
	const app = new AppManager()

	return {
		schema,
		db,
		fb,
		app
	}
}
