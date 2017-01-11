import {observable, action, transaction, asMap} from 'mobx'


export class PersonStore {
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
			birthDate: person.birthDate || person.birth_date,
			name: person.name,
			pingTime: person.pingTime || person.ping_time,
			smallPhoto: person.smallPhoto || person.photos[0].processedFiles[3].url,
			largePhoto: person.largePhoto || person.photos[0].processedFiles[0].url
		}
	}

	@action init = (personData) => {
		Object.assign(this, personData);
	};

	@action updatePerson = (personData) => {
		this.init(this.normalize(personData))
	}
}
