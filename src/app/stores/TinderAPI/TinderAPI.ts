import {
	AbstractTinderAPI,
	AbstractTinderAPIParams,
	ioTinderDefaults,
	ioTinderPerson,
	ioTinderProfileUser,
	ioTinderSendMessage,
	ioTinderHistory,
	TinderDefaultsType,
	TinderPersonType,
	ITinderProfile,
	TinderSendMessageType,
	TinderHistoryType
} from '~/shared/definitions'
import TinderClient from 'tinder-modern'

export class TinderAPI extends AbstractTinderAPIParams
	implements AbstractTinderAPI {
	client: TinderClient
	subscriptionInterval: number | null = null
	subscriptionPromise: Promise<any> | null = null
	authPromise: Promise<true> | null = null
	authPromiseExternalResolve: ((arg: true) => void) | null = null

	constructor(params: AbstractTinderAPIParams) {
		super()
		Object.assign(this, params)
		this.resetClient()
	}

	resetClient = () => {
		this.client = new TinderClient({
			lastActivityDate: this.lastActivityDate
		})
	}

	setLastActivityTimestamp = async (lastActivityDate: Date) => {
		this.lastActivityDate = lastActivityDate
		await this.storage.save('tinder', {
			lastActivityTimestamp: lastActivityDate.getTime()
		})
	}

	isAuthorized = async () => {
		try {
			await this.getProfile()
			return true
		} catch (err) {
			return false
		}
	}

	getDefaults = (): any => {
		return this.client.getDefaults()
	}

	getPerson = (id: string): Promise<any> => {
		return this.client.getUser({ userId: id }).then(res => res.results)
	}

	getProfile = (): Promise<any> => {
		return this.client.getAccount()
	}

	sendMessage = async (id: string, message: string): Promise<any> => {
		return this.client.sendMessage({
			matchId: id,
			message
		})
	}

	authorize = async ({
		fbToken,
		fbId
	}: {
		fbToken: string
		fbId: string
	}) => {
		await this.client.authorize({ fbToken, fbId })
	}

	getHistory = (): Promise<any> => {
		return this.client.getHistory()
	}

	getUpdates = async (): Promise<any> => {
		const updates = await this.client.getUpdates()
		await this.setLastActivityTimestamp(this.client.lastActivity)

		return updates
	}
}
