import { NOTIFICATION } from '~/shared/constants'
import { ipcRenderer } from 'electron'
import { NotificationMessageType } from '~/shared/definitions'

export class NotifierClient {
	constructor() {
		ipcRenderer.on(NOTIFICATION, this.handleNotification)
	}

	handleNotification(
		_event: Event,
		{ title, body }: NotificationMessageType
	) {
		const notification = new Notification(title, {
			body
		})
		setTimeout(notification.close.bind(notification), 5000)
	}
}
