import {
	VIEW_AUTH,
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_PROFILE
} from '~/shared/constants'
import { nameToPath } from '~/shared/utils'
import { AbstractAPI } from '~/shared/definitions'
import { History as CustomHistory } from 'history'

export interface IGQLResponce {
	initialRoute: string
}

export class Navigator {
	history: CustomHistory

	setHistory(history: CustomHistory) {
		this.history = history
	}

	start = async ({ api }: { api: AbstractAPI }) => {
		const initialRoute = await api.getInitialRoute()
		history.replaceState(
			{},
			'Chatinder',
			`${location.pathname}#${initialRoute}`
		)
		await api.showWindow()
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
