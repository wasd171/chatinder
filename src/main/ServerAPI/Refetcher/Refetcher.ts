import { AbstractRefetcher, AbstractRefetcherParams } from 'shared/definitions'
import {
	SUBSCRIPTION_MATCHES_ALL,
	SUBSCRIPTION_MATCH,
	SUBSCRIPTION_MATCH_BLOCKED
} from 'shared/constants'

export class Refetcher extends AbstractRefetcher implements AbstractRefetcher {
	constructor(params: AbstractRefetcherParams) {
		super()
		Object.assign(this, params)
	}

	notifyAllMatches = () => {
		if (this.app.window != null) {
			this.app.window.webContents.send(SUBSCRIPTION_MATCHES_ALL)
		}
	}

	notifyMatch = (id: string) => {
		if (this.app.window != null) {
			this.app.window.webContents.send(SUBSCRIPTION_MATCH, { id })
		}
	}

	notifyMatchBlocked = (id: string) => {
		if (this.app.window != null) {
			this.app.window.webContents.send(SUBSCRIPTION_MATCH_BLOCKED, { id })
		}
	}
}
