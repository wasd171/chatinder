import { NotificationMessageType } from '~/shared/definitions'

export class Notifier {
	notify({ title, body }: NotificationMessageType) {
		const notification = new Notification(title, {
			body
		})
		setTimeout(notification.close.bind(notification), 5000)
	}
}
