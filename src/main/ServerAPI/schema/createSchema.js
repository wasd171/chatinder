// @flow
import typeDefs from './typeDefs'
import {resolverMap} from './resolvers'
import {makeExecutableSchema} from 'graphql-tools'


export function createSchema() {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: resolverMap
    });

    return schema
}