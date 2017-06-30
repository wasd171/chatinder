import typeDefs from './typeDefs'
import { resolverMap } from './resolvers'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

export function createSchema(): GraphQLSchema {
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers: resolverMap
	})

	return schema
}
