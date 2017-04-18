// @flow
import type {PersonType} from './Person'
import type {MessageType} from './Message'


export type MatchType = {
    _id: string,
    person: PersonType,
    messages: MessageType[],
    lastMessage: string,
    lastActivityDate: string
}