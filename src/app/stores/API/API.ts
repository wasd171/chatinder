import { ApolloClient } from 'apollo-client'
import { DocumentNode } from 'graphql'
import {
	AbstractAPI,
	StateType,
	AbstractTinderAPI,
	IAPIGenericReturn,
	PersonType,
	IAPISendMessage
} from '~/shared/definitions'

import * as logoutMutation from './logout.graphql'
import * as getFBQuery from './getFB.graphql'
import * as showWindow from './showWindow.graphql'
import * as loginFB from './loginFB.graphql'

import {
	GetFbQuery,
	ShowWindowMutation,
	LoginFbMutation,
	LogoutMutation
} from '~/schema'
import {
	VIEW_MATCHES,
	VIEW_AUTH,
	routes,
	success,
	PENDING,
	FAILURE,
	SUCCESS
} from '~/shared/constants'
import { isOnline } from './utils'
import * as uuid from 'uuid'
import { MessageType } from '~/shared/definitions'

export interface IAPIProps {
	client: ApolloClient
	state: StateType
	tinder: AbstractTinderAPI
}

export class API implements AbstractAPI {
	private client: ApolloClient
	private reloginPromise: Promise<void> | null = null
	private state: StateType
	private tinder: AbstractTinderAPI

	constructor(props: IAPIProps) {
		Object.assign(this, props)
	}

	mutate = async <R = {}>(mutation: DocumentNode, variables?: Object) => {
		return (await this.client.mutate<R>({ mutation, variables })).data as R
	}

	query = async <R = {}>(query: DocumentNode, variables?: Object) => {
		return (await this.client.query<R>({ query, variables })).data
	}

	public login = async (silent?: boolean): Promise<IAPIGenericReturn> => {
		this.tinder.resetClient()
		let fb = (await this.query<GetFbQuery>(getFBQuery)).fb
		try {
			if (fb.token === null || fb.id === null) {
				throw new Error('fbToken or fbId is not present')
			}
			await this.tinder.authorize({ fbToken: fb.token, fbId: fb.id })
			return success
		} catch (err) {}

		try {
			fb = (await this.mutate<LoginFbMutation>(loginFB, {
				silent
			})).loginFB

			await this.tinder.authorize(
				{ fbToken: fb.token, fbId: fb.id } as {
					fbToken: string
					fbId: string
				}
			)
			return success
		} catch (err) {
			return { status: 'Unauthorized' }
		}
	}

	public checkDoMatchesExist = async (): Promise<boolean> => {
		const matchesCount = this.state.matches.size

		if (matchesCount !== 0) {
			return true
		} else {
			const history: any = await new Promise(async resolve => {
				let resolved = false
				let history: any | null = null

				while (!resolved || history === null) {
					try {
						history = await this.tinder.getHistory()
						resolved = true
					} catch (err) {
						await this.relogin()
					}
				}

				resolve(history)
			})

			if (history.matches.length === 0) {
				return false
			} else {
				// const matches = normalizeAllMatches(history.matches)

				if (history.matches.length !== 0) {
					this.state.mergeUpdates(history, true)
					return true
				} else {
					return false
				}
			}
		}
	}

	private getUpdates = async () => {
		if (this.tinder.subscriptionPromise === null) {
			this.tinder.subscriptionPromise = new Promise(async resolve => {
				let resolved = false
				let updates: any | null = null

				while (!resolved || updates === null) {
					try {
						updates = await this.tinder.getUpdates()
						// updates.matches = normalizeAllMatches(updates.matches)
						resolved = true
					} catch (err) {
						await this.relogin()
					}
				}

				resolve(updates)
			})

			const updates = await this.tinder.subscriptionPromise
			this.tinder.subscriptionPromise = null
			this.state.mergeUpdates(updates, false)
		}
	}

	public subscribeToUpdates = async (): Promise<IAPIGenericReturn> => {
		if (this.tinder.subscriptionInterval !== null) {
			clearInterval(this.tinder.subscriptionInterval)
			this.tinder.subscriptionInterval = null
		}

		let defaults = this.state.defaults || this.tinder.getDefaults()
		if (defaults === null) {
			while (defaults === null) {
				await this.relogin()
				defaults = this.tinder.getDefaults()
			}
			// defaults.user = normalizePerson(defaults.user)
			this.state.setDefaults(defaults)
		}

		const interval = defaults.globals.updates_interval
		this.tinder.subscriptionInterval = setInterval(
			() => this.getUpdates(),
			interval
		)

		return success
	}

	public logout = async () => {
		const res = await this.mutate<LogoutMutation>(logoutMutation)
		return res.logout
	}

	public getFB = () => {
		return this.query<GetFbQuery>(getFBQuery)
	}

	public getInitialRoute = async (): Promise<string> => {
		const matchesCount = this.state.matches.size
		if (matchesCount !== 0) {
			return routes[VIEW_MATCHES]
		} else {
			const { token, id } = (await this.getFB()).fb
			if (token !== null && id !== null) {
				return routes[VIEW_MATCHES]
			} else {
				return routes[VIEW_AUTH]
			}
		}
	}

	public showWindow = () => {
		return this.mutate<ShowWindowMutation>(showWindow)
	}

	public relogin = async () => {
		if (this.reloginPromise === null) {
			this.reloginPromise = new Promise(async resolve => {
				let loggedIn = false

				while (!loggedIn) {
					const online = await isOnline()
					if (online) {
						const res = await this.login(true)
						if (res.status === success.status) {
							loggedIn = true
							this.reloginPromise!.then(() => {
								this.reloginPromise = null
							})
						} else {
							await new Promise(ok => setTimeout(ok, 5000))
						}
					}
				}

				resolve()
			})
		}

		return this.reloginPromise
	}

	public updateProfile = async () => {
		const profile = await this.tinder.getProfile()
		this.state.defaults!.user.update(profile)
	}

	public updatePerson = async (person: PersonType) => {
		const newPerson = await this.tinder.getPerson(person._id)
		person.update(newPerson)
	}

	public sendMessage = async ({ message, matchId }: IAPISendMessage) => {
		const match = this.state.matches.get(matchId)!
		const rawMessage = {
			_id: uuid.v1(),
			from: this.state.defaults!.user._id,
			to: matchId,
			message,
			status: PENDING
		}
		const newMessage = match.addMessage(rawMessage, match.lastMessage)
		this.state.addMessageToPending(newMessage)
		try {
			await this.tinder.sendMessage(matchId, message)
			newMessage.changeStatus(SUCCESS)
			this.state.addMessageToSent(newMessage)
		} catch (err) {
			newMessage.changeStatus(FAILURE)
		}

		this.state.addMessageToPending(newMessage)
	}

	public resendMessage = async (messageId: string) => {
		const pendingMessage = this.state.pendingMessages.get(
			messageId
		) as MessageType

		pendingMessage.changeStatus(PENDING)
		try {
			await this.tinder.sendMessage(
				pendingMessage.to,
				pendingMessage.message
			)
			pendingMessage.changeStatus(SUCCESS)
			this.state.addMessageToSent(pendingMessage)
		} catch (err) {
			pendingMessage.changeStatus(FAILURE)
		}
	}
}
