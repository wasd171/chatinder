import { NOTIFICATION } from 'shared/constants'
import { ipcRenderer } from 'electron'

export class NotifierClient {
	constructor() {
		ipcRenderer.on(NOTIFICATION, this.handleNotification)
	}

	handleNotification(
		event: Event,
		{ title, body }: { title: string, body: string }
	) {
		const notification = new Notification(title, {
			body
		})
		setTimeout(notification.close.bind(notification), 5000)
	}
}
