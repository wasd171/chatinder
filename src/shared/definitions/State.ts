import {
	State,
	Match,
	IMessage,
	Photo,
	Interest,
	Person
} from '~/app/stores/State'

export type StateType = typeof State.Type
export type MatchType = typeof Match.Type
export type MessageType = IMessage
export type PhotoType = typeof Photo.Type
export type InterestType = typeof Interest.Type
export type PersonType = typeof Person.Type
