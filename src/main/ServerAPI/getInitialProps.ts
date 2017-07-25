import { createSchema } from './schema'
import { resolveDatabases, fromCallback } from '~/shared/utils'
import { join } from 'path'
import { FB } from './FB'
import { AppManager } from './AppManager'
import { AbstractFBSaved } from '~/shared/definitions'
import * as fs from 'fs'

export async function getInitialProps() {
	const schema = createSchema()

	const fbPath = join(resolveDatabases(), 'fb.json')
	let fbParams: AbstractFBSaved
	try {
		const data = (await fromCallback(callback =>
			fs.readFile(fbPath, callback)
		)) as string
		fbParams = JSON.parse(data)
	} catch (err) {
		fbParams = {}
	}
	const fbProps = Object.assign({ ...fbParams, fbPath })

	const fb = new FB(fbProps)
	const app = new AppManager()

	return {
		schema,
		fb,
		app
	}
}
