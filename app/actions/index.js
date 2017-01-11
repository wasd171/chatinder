import {action} from 'mobx'
import {ipcRenderer} from 'electron'

import showAuth from './showAuth'
import showMain from './showMain'
import showLoading from './showLoading'
import loginWithFacebook from './loginWithFacebook'
import handleLoginButtonClick from './handleLoginButtonClick'
import initialTinderAuthorize from './initialTinderAuthorize'
import authorizeTinderWithToken from './authorizeTinderWithToken'
import authorizeTinder from './authorizeTinder'
import getHistory from './getHistory'
import getUpdates from './getUpdates'
import getUser from './getUser'
import getProfile from './getProfile'


export default class Actions {
	view;
	auth;
	tinder;

	constructor({view, auth, tinder}) {
		this.view = view;
		this.auth = auth;
		this.tinder = tinder;
	}

	@action showAuth = () => showAuth({view: this.view});
	@action showMain = (params) => showMain({view: this.view}, params);
	@action showLoading = (title) => showLoading({view: this.view}, title);

	@action loginWithFacebook = () => loginWithFacebook({ipcRenderer, auth: this.auth});
	@action handleLoginButtonClick = () => handleLoginButtonClick({
		showLoading: this.showLoading,
		showMain: this.showMain,
		loginWithFacebook: this.loginWithFacebook,
		initialTinderAuthorize: this.initialTinderAuthorize
	});

	@action initialTinderAuthorize = () => initialTinderAuthorize({
		auth: this.auth,
		authorizeTinderWithToken: this.authorizeTinderWithToken,
		authorizeTinder: this.authorizeTinder
	});
	@action authorizeTinderWithToken = () => authorizeTinderWithToken({auth: this.auth});
	@action authorizeTinder = () => authorizeTinder({auth: this.auth});

	@action getHistory = () => getHistory({tinder: this.tinder});
	@action getUpdates = () => getUpdates();
	@action getUser = () => getUser({view: this.view, tinder: this.tinder});
	@action getProfile = () => getProfile({tinder: this.tinder});
}