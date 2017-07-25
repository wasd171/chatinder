import * as Query from './queries'
import * as Mutation from './mutations'

export const resolverMap = {
	Query,
	Mutation
} as any // Fixes createSchema
