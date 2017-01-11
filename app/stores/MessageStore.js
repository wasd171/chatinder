import emojione from 'emojione'


export class MessageStore {
	_id;
	message;
	from;
	sentDate;
	messageGroup;

	constructor({message: messageObj, previousMessage, raw}) {
		Object.assign(this, {
			_id: messageObj._id,
			message: raw ? emojione.toShort(messageObj.message) : messageObj.message,
			from: messageObj.from,
			sentDate: messageObj.sentDate || messageObj.sent_date
		});

		if (previousMessage && previousMessage.from === messageObj.from) {
			this.messageGroup = previousMessage.messageGroup
		} else {
			this.messageGroup = `${this.from}_${this._id}`;
		}
	}
}