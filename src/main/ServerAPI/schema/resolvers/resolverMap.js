// @flow
import * as Query from './queries'
import * as Mutation from './mutations'
import * as Instances from './instances'


export const resolverMap = {
    Query,
    Mutation,
    ...Instances
}