import {
	AbstractAPI,
	StateType,
	AbstractTinderAPI,
	IAPIGenericReturn,
	PersonType,
	IAPISendMessage,
	AbstractFB
} from '~/shared/definitions'

import {
	VIEW_MATCHES,
	VIEW_AUTH,
	routes,
	success,
	PENDING,
	FAILURE,
	SUCCESS,
	IPC_LOGOUT,
	IPC_SHOW_WINDOW
} from '~/shared/constants'
import { ipcRenderer } from 'electron'
import { isOnline } from './utils'
import * as uuid from 'uuid'
import { MessageType } from '~/shared/definitions'

export interface IAPIProps {
	state: StateType
	tinder: AbstractTinderAPI
	fb: AbstractFB
}

export class API implements AbstractAPI {
	private reloginPromise: Promise<void> | null = null
	private state: StateType
	private tinder: AbstractTinderAPI
	private fb: AbstractFB

	constructor(props: IAPIProps) {
		Object.assign(this, props)
	}

	public login = async (silent: boolean): Promise<IAPIGenericReturn> => {
		this.tinder.resetClient()

		try {
			if (this.fb.token === undefined || this.fb.id === undefined) {
				throw new Error('fbToken or fbId is not present')
			}
			await this.tinder.authorize({
				fbToken: this.fb.token,
				fbId: this.fb.id
			})
			return success
		} catch (err) {}

		try {
			await this.fb.login(silent)

			await this.tinder.authorize(
				{ fbToken: this.fb.token, fbId: this.fb.id } as {
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
		console.log('checkDoMatchesExist', matchesCount)

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

		if (this.state.defaults === null) {
			while (this.tinder.getDefaults() === null) {
				await this.relogin()
			}
			this.state.setDefaults(this.tinder.getDefaults())
		}
		const { defaults } = this.state

		const interval = defaults!.globals.updates_interval
		this.tinder.subscriptionInterval = window.setInterval(
			() => this.getUpdates(),
			interval
		)

		return success
	}

	public logout = () => {
		ipcRenderer.send(IPC_LOGOUT)
	}

	public getInitialRoute = async (): Promise<string> => {
		const matchesCount = this.state.matches.size
		console.log({ matchesCount })
		if (matchesCount !== 0) {
			return routes[VIEW_MATCHES]
		} else {
			const { token, id } = this.fb
			console.log({ token, id })
			if (token !== undefined && id !== undefined) {
				return routes[VIEW_MATCHES]
			} else {
				return routes[VIEW_AUTH]
			}
		}
	}

	public showWindow = () => {
		ipcRenderer.send(IPC_SHOW_WINDOW)
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
