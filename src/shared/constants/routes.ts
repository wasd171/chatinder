import {
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_PROFILE,
	VIEW_AUTH,
	VIEW_LOADING
} from './view'
import { nameToPath } from 'shared/utils'

export const routes = [
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_PROFILE,
	VIEW_AUTH,
	VIEW_LOADING
].reduce((obj, name) => {
	obj[name] = nameToPath(name)
	return obj
}, {})
