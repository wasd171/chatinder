// @flow
import {normalizeMatch} from './normalizeMatch'


function normalizeReducer(accumulator, match) {
    const normalizedMatch = normalizeMatch(match);
    if (normalizedMatch !== null) {
        accumulator.push(normalizedMatch);
    }

    return accumulator
}

export function normalizeAllMatches(matches) {
    return matches.reduce(normalizeReducer, []);
}