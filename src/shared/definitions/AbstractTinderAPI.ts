import {
	AbstractTinderAPIParams,
	TinderDefaultsType,
	TinderPersonType,
	ITinderProfile,
	TinderSendMessageType,
	TinderHistoryType
} from '.'
import TinderClient from 'tinder-modern'

export abstract class AbstractTinderAPI extends AbstractTinderAPIParams {
	client: TinderClient
	subscriptionInterval: NodeJS.Timer | null
	subscriptionPromise: Promise<any> | null
	authPromise: Promise<true> | null
	authPromiseExternalResolve: ((arg: true) => void) | null

	abstract resetClient(): void
	abstract setLastActivityTimestamp({
		lastActivityDate
	}: {
		lastActivityDate: Date
	}): Promise<any>
	abstract isAuthorized: () => Promise<boolean>
	abstract getDefaults: () => TinderDefaultsType
	abstract getPerson: (id: string) => Promise<TinderPersonType>
	abstract getProfile: () => Promise<ITinderProfile>
	abstract sendMessage: (
		id: string,
		message: string
	) => Promise<TinderSendMessageType>
	abstract authorize: (
		{ fbToken, fbId }: { fbToken: string; fbId: string }
	) => Promise<undefined>
	abstract getHistory: () => Promise<TinderHistoryType>
	abstract getUpdates: () => Promise<TinderHistoryType>
}
