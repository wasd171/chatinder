import { normalizeMatch } from './normalizeMatch'
import { TinderMatchType, FormattedMatchType } from '~/shared/definitions'

function normalizeReducer(
	accumulator: Array<FormattedMatchType>,
	match: TinderMatchType
) {
	const normalizedMatch = normalizeMatch(match)
	if (normalizedMatch !== null) {
		accumulator.push(normalizedMatch)
	}

	return accumulator
}

export function normalizeAllMatches(
	matches: Array<TinderMatchType>
): Array<FormattedMatchType> {
	return matches.reduce(normalizeReducer, [])
}
