import {computed, action, autorun} from 'mobx'
import {save as defaultSave} from 'app/utils'
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
	save;
	ipc;
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


	constructor({api, view, tinder, clock, save = defaultSave, ipc = ipcRenderer}) {
		Object.assign(this, {api, view, tinder, clock, save, ipc});
	}

	start = start.bind(this);
	startListeners = startListeners.bind(this);
	startAutoSave = startAutoSave.bind(this);
	startAutoUpdate = startAutoUpdate.bind(this);
	startAutoUpdatePerson = startAutoUpdatePerson.bind(this);
	login = login.bind(this);
	goToMain = goToMain.bind(this);
	goToAuth = goToAuth.bind(this);
	goToLoading = goToLoading.bind(this);
	handleLoginButtonClick = handleLoginButtonClick.bind(this);
}

export function FacadeFactory({api, view, tinder, clock}) {
	return new Facade({api, view, tinder, clock})
}