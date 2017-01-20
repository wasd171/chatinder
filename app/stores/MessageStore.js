import emojione from 'emojione'


export class MessageStore {
	_id;
	message;
	from;
	timestamp;
	messageGroup;

	constructor(messageObj) {
		Object.assign(this, {
			_id: messageObj._id,
			message: messageObj.formattedMessage,
			from: messageObj.from,
			timestamp: messageObj.timestamp,
			messageGroup: messageObj.messageGroup
		});
	}
}