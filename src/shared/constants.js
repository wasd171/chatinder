// @flow
import { nameToPath } from 'shared/utils'

export const GRAPHQL = 'GRAPHQL'
export const GRAPHQL_SUBSCRIPTIONS = 'GRAPHQL_SUBSCRIPTIONS' //TODO: implement proper subscriptions

export const SUBSCRIPTION_MATCHES_ALL = 'SUBSCRIPTION_MATCHES_ALL'
export const SUBSCRIPTION_MATCH = 'SUBSCRIPTION_MATCH'
export const SUBSCRIPTION_MATCH_BLOCKED = 'SUBSCRIPTION_MATCH_BLOCKED'

export const VIEW_MAIN = 'VIEW_MAIN'
export const VIEW_CHAT = 'VIEW_CHAT'
export const VIEW_USER = 'VIEW_USER'
export const VIEW_PROFILE = 'VIEW_PROFILE'
export const VIEW_AUTH = 'VIEW_AUTH'
export const VIEW_LOADING = 'VIEW_LOADING'
export const VIEW_OFFLINE = 'VIEW_OFFLINE'

export const routes = [
	VIEW_MAIN,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_PROFILE,
	VIEW_AUTH,
	VIEW_LOADING
].reduce((obj, name) => {
	obj[name] = nameToPath(name)
	return obj
}, {})

export const SUCCESS = 'SUCCESS'
export const PENDING = 'PENDING'
export const FAILURE = 'FAILURE'
export const PSEUDO = 'PSEUDO'

export const success = {
	status: 'OK'
}

export const NOTIFICATION = 'NOTIFICATION'
