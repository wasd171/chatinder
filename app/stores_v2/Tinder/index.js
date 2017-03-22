import {observable, action, computed} from 'mobx'
import sortBy from 'lodash/sortby'
import forEach from 'lodash/forEach'
import {Match} from '../Match'
import {Person} from '../Person'


export class Tinder {
	@observable matches = new Map();
	@observable profile;

	constructor({matches, profile}) {
		this.setMatches(matches);
		this.setProfile(profile);
	}

	@action setMatches = (matches) => {
		forEach(matches, match => {
			this.matches.set(match['_id'], new Match(match))
		});
	};

	@action setProfile = (person) => {
		if (person) {
			this.profile = new Person(person);
		}
	};

	@computed get isProfilePresent() {
		return !!this.profile;
	}

	@computed get dataIsPresent() {
		return (!!this.matches && this.matches.size > 0)
	}

	@computed get sortedIds() {
		return sortBy(this.matches.values(), match => -(new Date(match.lastActivityDate))).map(match => match['_id'])
	}
}