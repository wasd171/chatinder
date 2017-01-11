import {observable, action, transaction, asMap, asFlat} from 'mobx'
import {PersonStore} from './PersonStore'
import {MessageStore} from './MessageStore'
import last from 'lodash/last'

export class MatchStore {
	@observable _id;
	@observable createdDate;
	@observable lastActivityDate;
	@observable person;
	@observable messages = asFlat([]);

	constructor({match, raw}) {
		this.init({
			_id: match._id,
			createdDate: match.createdDate || match.created_date,
			lastActivityDate: match.lastActivityDate || match.last_activity_date,
			person: new PersonStore(match.person)
		});
		this.setMessages({messages: match.messages, raw});
	}

	@action init = async (matchData) => {
		Object.assign(this, matchData);
	};

	@action setId = (_id) => {
		this._id = _id;
	};

	@action setCreatedDate = (createdDate) => {
		this.createdDate = createdDate;
	};

	@action setLastActivityDate = (lastActivityDate) => {
		this.lastActivityDate = lastActivityDate;
	};

	@action setPerson = (person) => {
		this.person = new PersonStore(person);
	};

	@action setMessages = ({messages, raw}) => {
		let previousMessage = null;
		messages.forEach(message => {
			const nextMessage = new MessageStore({message, previousMessage, raw});
			this.messages.push(nextMessage);
			previousMessage = nextMessage;
		});
		previousMessage = null;
	};
}