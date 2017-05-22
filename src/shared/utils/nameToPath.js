// @flow
import { VIEW_CHAT, VIEW_USER, VIEW_LOADING } from 'shared/constants'

export function nameToPath(name: string) {
	switch (name) {
		case VIEW_CHAT:
			return `/:id/${VIEW_CHAT}`
		case VIEW_USER:
			return `/:id/${VIEW_USER}`
		case VIEW_LOADING:
			return `/${VIEW_LOADING}/:title`
		default:
			return `/${name}`
	}
}
