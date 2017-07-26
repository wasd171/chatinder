import { AbstractStorage } from '.'
import TinderClient from 'tinder-modern'

export abstract class AbstractTinderAPISaved {
	lastActivityTimestamp?: number
}

export abstract class AbstractTinderAPIParams {
	lastActivityDate: Date
	storage: AbstractStorage
}

export abstract class AbstractTinderAPI extends AbstractTinderAPIParams {
	client: TinderClient
	subscriptionInterval: number | null
	subscriptionPromise: Promise<any> | null
	authPromise: Promise<true> | null
	authPromiseExternalResolve: ((arg: true) => void) | null

	abstract resetClient(): void
	abstract setLastActivityTimestamp(lastActivityDate: Date): Promise<any>
	abstract isAuthorized: () => Promise<boolean>
	abstract getDefaults: () => any
	abstract getPerson: (id: string) => Promise<any>
	abstract getProfile: () => Promise<any>
	abstract sendMessage: (id: string, message: string) => Promise<any>
	abstract authorize: (
		{ fbToken, fbId }: { fbToken: string; fbId: string }
	) => Promise<void>
	abstract getHistory: () => Promise<any>
	abstract getUpdates: () => Promise<any>
}
