import Promise from 'bluebird'
import {when, action} from 'mobx'
import {normalizePerson} from '../DB/utils'
import {API_GET_PROFILE_SUCCESS, API_GET_USER_SUCCESS} from 'app/constants'


async function handleGetProfile(event, arg) {
	const savedProfile = await this.db.saveProfile(arg.user);
	this.tinder.setProfile(savedProfile);
}

async function handleGetPerson(event, arg) {
	if (arg.status === 200) {
		const {matchId, user} = await this.db.savePerson(arg.results);
		this.tinder.matches.get(matchId).person.updatePerson(user);
		if (
			this.view.currentView.params && 
			this.view.currentView.params.matchId && 
			matchId === this.view.currentView.params.matchId
		) {
			this.view.setNewChatSelected(false);
		}
	}
}

export default async function startListeners() {
	this.ipc.on(API_GET_PROFILE_SUCCESS, handleGetProfile.bind(this));
	this.ipc.on(API_GET_USER_SUCCESS, action(handleGetPerson.bind(this)));

	if (!this.tinder.isProfilePresent) {
		const promise = new Promise(resolve => when(() => this.tinder.isProfilePresent, resolve));
		this.api.getProfile();
		await promise;
	}

	this.startAutoUpdate();
	this.startAutoUpdatePerson();
}