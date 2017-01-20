import {computed, action, autorun} from 'mobx'
import {ipcRenderer} from 'electron'

import start from './start'
import startListeners from './startListeners'
import startAutoSave from './startAutoSave'
import startAutoUpdate from './startAutoUpdate'
import startAutoUpdatePerson from './startAutoUpdatePerson'
import login from './login'
import goToMain from './goToMain'
import goToAuth from './goToAuth'
import goToLoading from './goToLoading'
import handleLoginButtonClick from './handleLoginButtonClick'


export class Facade {
	api;
	view;
	tinder;
	clock;
	ipc;
	db;
	updateDisposer;
	updatePersonWrappedDisposer;
	updatePersonDisposer;
	forceAuthorizeDisposer;

	@computed get currentView() {
		return this.view.currentView
	}

	@computed get newChatSelected() {
		return this.view.newChatSelected
	}

	@computed get matches() {
		return this.tinder.matches
	}

	@computed get sortedIds() {
		return this.tinder.sortedIds
	}

	@computed get profile() {
		return this.tinder.profile
	}

	@computed get time() {
		return this.clock.getTime()
	}


	constructor({api, view, tinder, clock, ipc = ipcRenderer, db}) {
		Object.assign(this, {api, view, tinder, clock, ipc, db});
	}

	start = start.bind(this);
	startListeners = startListeners.bind(this);
	startAutoSave = startAutoSave.bind(this);
	startAutoUpdate = startAutoUpdate.bind(this);
	startAutoUpdatePerson = startAutoUpdatePerson.bind(this);
	login = login.bind(this);
	loginForce = login.bind(this, true);
	goToMain = goToMain.bind(this);
	goToAuth = goToAuth.bind(this);
	goToLoading = goToLoading.bind(this);
	handleLoginButtonClick = handleLoginButtonClick.bind(this);
}

export function FacadeFactory({api, view, tinder, clock, db}) {
	return new Facade({api, view, tinder, clock, db})
}