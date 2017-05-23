import {
	VIEW_AUTH,
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_PROFILE
} from 'shared/constants'
import { nameToPath } from 'shared/utils'
import initialRouteQuery from './initialRoute.graphql'
import showWindowMutation from './showWindow.graphql'

export class Navigator {
	history

	setHistory(history) {
		this.history = history
	}

	start = async ({ client }) => {
		const { data: { initialRoute } } = await client.query({
			query: initialRouteQuery
		})
		history.replaceState(
			{},
			'Chatinder',
			`${location.pathname}#${initialRoute}`
		)
		await client.mutate({ mutation: showWindowMutation })
	}

	push(node: string, params: string | void) {
		this.history.push(nameToPath(node, params))
	}

	goToAuth() {
		this.push(VIEW_AUTH)
	}

	goToLoading(title) {
		this.push(VIEW_LOADING, title)
	}

	goToMatches() {
		this.push(VIEW_MATCHES)
	}

	goToChat(id) {
		this.push(VIEW_CHAT, id)
	}

	goToUser(id) {
		this.push(VIEW_USER, id)
	}

	goToProfile() {
		this.push(VIEW_PROFILE)
	}
}
