import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import { createSchema } from '~/main/ServerAPI/schema'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
	const result = await graphql(createSchema(), introspectionQuery)
	if (result.errors) {
		console.error(
			'ERROR introspecting schema: ',
			JSON.stringify(result.errors, null, 2)
		)
	} else {
		fs.writeFileSync(
			path.join(process.cwd(), 'schema.json'),
			JSON.stringify(result, null, 2)
		)
	}
}

main()
