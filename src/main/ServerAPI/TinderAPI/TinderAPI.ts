import * as t from 'io-ts'
import { reporter } from 'io-ts-reporters'
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
} from 'shared/definitions'
import TinderClient from 'tinder-modern'
import { fromCallback } from 'shared/utils'

export class TinderAPI extends AbstractTinderAPIParams
	implements AbstractTinderAPI {
	client: TinderClient
	subscriptionInterval: NodeJS.Timer | null = null
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

	setLastActivityTimestamp = async ({
		lastActivityDate
	}: {
		lastActivityDate: Date
	}) => {
		this.lastActivityDate = lastActivityDate
		return fromCallback(callback =>
			this.db.update(
				{ _id: 'tinder' },
				{
					$set: {
						lastActivityTimestamp: this.lastActivityDate.getTime()
					}
				},
				{ upsert: true },
				callback
			)
		)
	}

	isAuthorized = async () => {
		try {
			await this.getProfile()
			return true
		} catch (err) {
			return false
		}
	}

	check({ data, schema }) {
		const validation = t.validate(data, schema)
		const report = reporter(validation)
		console.error(report)
	}

	getDefaults = (): TinderDefaultsType => {
		const defaults = this.client.getDefaults()

		this.check({ data: defaults, schema: ioTinderDefaults })
		return defaults
	}

	getPerson = async (id: string): Promise<TinderPersonType> => {
		const person = await this.client
			.getUser({ userId: id })
			.then(res => res.results)

		this.check({ data: person, schema: ioTinderPerson })
		return person
	}

	getProfile = async (): Profile<ITinderProfile> => {
		const profile = await this.client.getAccount()

		this.check({ data: profile.user, schema: ioTinderProfileUser })
		return profile
	}

	sendMessage = async (
		id: string,
		message: string
	): Promise<TinderSendMessageType> => {
		const sentMessage = await this.client.sendMessage({
			matchId: id,
			message
		})

		this.check({ data: sentMessage, schema: ioTinderSendMessage })
		return sentMessage
	}

	authorize = async ({ fbToken, fbId }: { fbToken: string fbId: string }) => {
		await this.client.authorize({ fbToken, fbId })
	}

	getHistory = async (): Promise<TinderHistoryType> => {
		const history = await this.client.getHistory()

		this.check({ data: history, schema: ioTinderHistory })
		return history
	}

	getUpdates = async (): Promise<TinderHistoryType> => {
		const updates = await this.client.getUpdates()
		await this.setLastActivityTimestamp({
			lastActivityDate: this.client.lastActivity
		})

		this.check({ data: updates, schema: ioTinderHistory })
		return updates
	}
}
