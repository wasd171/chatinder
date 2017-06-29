import { NOTIFICATION } from '~/shared/constants'
import {
	AbstractNotifierServer,
	AbstractNotifierServerParams,
	NotificationMessageType
} from '~/shared/definitions'

export class NotifierServer extends AbstractNotifierServer
	implements AbstractNotifierServer {
	constructor(params: AbstractNotifierServerParams) {
		super()
		Object.assign(this, params)
	}

	notify = ({ title, body }: NotificationMessageType) => {
		if (this.app.window != null) {
			this.app.window.webContents.send(NOTIFICATION, { title, body })
		}
	}
}
