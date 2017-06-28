import { normalizeMessage } from 'shared/utils'
import { normalizePerson } from './normalizePerson'
import { TinderMatchType, FormattedMatchType } from 'shared/definitions'

export function normalizeMatch(
	match: TinderMatchType
): FormattedMatchType | null {
	if (typeof match.person === 'undefined') {
		return null
	} else {
		const formattedMatch = Object.assign({}, match)
		const messages = match.messages.map(normalizeMessage)
		const person = normalizePerson(match.person)

		return { ...formattedMatch, messages, person }
	}
}
