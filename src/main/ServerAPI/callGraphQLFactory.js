// @flow
import {ServerAPI} from './ServerAPI'
import {graphql} from 'graphql'


export default function callGraphQLFactory(instance: ServerAPI) {
    return function callGraphQL(payload: any) {
        const {query, variables, operationName} = payload;
        return graphql(instance.schema, query, null, instance, variables, operationName);
    }
}