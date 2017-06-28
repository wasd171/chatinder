import { AbstractNotifierServerParams, NotificationMessageType } from '.'

export abstract class AbstractNotifierServer extends AbstractNotifierServerParams {
	abstract notify: (params: NotificationMessageType) => void
}
