// @flow
import {normalizeMessage} from 'shared/utils'
import {normalizePerson} from './normalizePerson'


export function normalizeMatch(match: any) {
    if (typeof match.person === 'undefined') {
        return null
    } else {
        const formattedMatch = Object.assign({}, match);
        formattedMatch.messages = match.messages.map(normalizeMessage);
        formattedMatch.person = normalizePerson(match.person);

        return formattedMatch
    }
}