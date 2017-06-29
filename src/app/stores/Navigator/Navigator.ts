import {
	VIEW_AUTH,
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_PROFILE
} from 'shared/constants'
import { nameToPath } from 'shared/utils'
import * as initialRouteQuery from './initialRoute.graphql'
import * as showWindowMutation from './showWindow.graphql'
import { ApolloClient } from 'apollo-client'
import { History as CustomHistory } from 'history'

export interface IGQLResponce {
	initialRoute: string
}

export class Navigator {
	history: CustomHistory

	setHistory(history: CustomHistory) {
		this.history = history
	}

	start = async ({ client }: { client: ApolloClient }) => {
		const { data: { initialRoute } } = await client.query<IGQLResponce>({
			query: initialRouteQuery
		})
		history.replaceState(
			{},
			'Chatinder',
			`${location.pathname}#${initialRoute}`
		)
		await client.mutate({ mutation: showWindowMutation })
	}

	push(node: string, params?: string) {
		const hash = nameToPath(node, params)
		if (`#${hash}` !== location.hash) {
			this.history.push(hash)
		}
	}

	goToAuth() {
		this.push(VIEW_AUTH)
	}

	goToLoading(title: string) {
		this.push(VIEW_LOADING, title)
	}

	goToMatches() {
		this.push(VIEW_MATCHES)
	}

	goToChat(id: string) {
		this.push(VIEW_CHAT, id)
	}

	goToUser(id: string) {
		this.push(VIEW_USER, id)
	}

	goToProfile() {
		this.push(VIEW_PROFILE)
	}

	goBack() {
		this.history.goBack()
	}
}
