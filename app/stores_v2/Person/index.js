import {observable, action, transaction, asMap} from 'mobx'


export class Person {
	@observable _id;
	@observable bio;
	@observable birthDate;
	@observable name;
	@observable pingTime;
	@observable smallPhoto;
	@observable largePhoto;

	constructor(person) {
		this.init(this.normalize(person));
	}

	normalize(person) {
		return {
			_id: person._id,
			bio: person.bio,
			birthDate: person.birthDate,
			name: person.name,
			pingTime: person.pingTime,
			smallPhoto: person.smallPhoto,
			largePhoto: person.largePhoto
		}
	}

	@action init = (personData) => {
		Object.assign(this, personData);
	};

	@action updatePerson = (personData) => {
		this.init(this.normalize(personData))
	}
}
