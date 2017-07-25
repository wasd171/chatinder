import emojione from '~/app/shims/emojione'
import * as he from 'he'

export function emojify(text: string) {
	return emojione.unicodeToImage(he.escape(text))
}

export function isGIPHY(message: string) {
	return /^https?:\/\/(.*)giphy.com/.test(message)
}
