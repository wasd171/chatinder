// @flow
import {
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_MATCHES
} from 'shared/constants'

export function nameToPath(name: string, param: string | void) {
	switch (name) {
		case VIEW_CHAT:
			return `${nameToPath(VIEW_MATCHES)}/${param || ':id'}/${VIEW_CHAT}`
		case VIEW_USER:
			return `${nameToPath(VIEW_MATCHES)}/${param || ':id'}/${VIEW_USER}`
		case VIEW_LOADING:
			return `/${VIEW_LOADING}/${param || ':title'}`
		default:
			return `/${name}`
	}
}
