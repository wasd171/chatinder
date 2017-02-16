import format from 'date-fns/format'


export class MessageStore {
	_id;
	message;
	from;
	timestamp;
	messageGroup;
	sentTime;


	constructor(messageObj) {
		Object.assign(this, {
			_id: messageObj._id,
			message: messageObj.formattedMessage,
			from: messageObj.from,
			timestamp: messageObj.timestamp,
			messageGroup: messageObj.messageGroup,
			sentTime: format(messageObj.timestamp, 'H:mm'),
			sentDay: format(messageObj.timestamp, 'MMMM D')
		});
	}
}