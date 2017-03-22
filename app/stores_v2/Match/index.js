import {observable, action, transaction} from 'mobx'
import {Person} from '../Person'
import {Message} from '../Message'
import last from 'lodash/last'

export class Match {
	@observable _id;
	@observable createdDate;
	@observable lastActivityDate;
	@observable person;
	messages = observable.shallowArray([]);

	constructor(match) {
		this.init({
			_id: match._id,
			lastActivityDate: match.lastActivityDate,
			person: new Person(match.person)
		});
		this.setMessages(match.messages);
	}

	@action init = (matchData) => {
		Object.assign(this, matchData);
	};

	@action setPerson = (person) => {
		this.person = new Person(person);
	};

	@action setMessages = (messages) => {
		messages.forEach(message => {
			this.messages.push(new Message(message));
		});
	};

	@action updateMatch = (match) => {
		this.init({
			lastActivityDate: match.lastActivityDate
		});
		this.setMessages(match.messages);
	};
}