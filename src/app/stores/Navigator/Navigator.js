import { configureRouter } from './configureRouter'
import {
	VIEW_AUTH,
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_PROFILE
} from 'shared/constants'
import showWindowMutation from './showWindow.graphql'

export class Navigator {
	router

	start = async ({ view, client }) => {
		this.router = await configureRouter({ view, client })
		await client.mutate({ mutation: showWindowMutation })
	}

	goToAuth() {
		this.router.navigate(VIEW_AUTH)
	}

	goToLoading(title) {
		this.router.navigate(VIEW_LOADING, { title })
	}

	goToMatches() {
		this.router.navigate(VIEW_MATCHES)
	}

	goToChat({ id, index }) {
		this.router.navigate(`${VIEW_MATCHES}.${VIEW_CHAT}`, { id, index })
	}

	goToUser({ id }) {
		this.router.navigate(`${VIEW_MATCHES}.${VIEW_USER}`, { id })
	}

	goToProfile() {
		this.router.navigate(`${VIEW_MATCHES}.${VIEW_PROFILE}`)
	}
}
