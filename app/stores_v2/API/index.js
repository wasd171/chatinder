import {observable, action, computed} from 'mobx'
import {retrieveFromApi} from 'app/utils'

import loginWithFB from './loginWithFB'
import authorize from './authorize'
import getHistory from './getHistory'
import getProfile from './getProfile'
import getUpdates from './getUpdates'
import getUser from './getUser'
import notifyMessage from './notifyMessage'
import sendMessage from './sendMessage'
import getDefaults from './getDefaults'
import logOut from './logOut'
import {login} from './login'


export class API {
	@observable fbToken;
	@observable fbTokenExpiresAt;
	@observable fbId;
	@observable tinderToken;
	@observable tinderIsAuthorized = false;
	@observable updatePending = false;
	@observable tinderDefaults;
	clock;
	retrieve;

	@computed get hasFbTokenExpired() {
		return (!this.fbTokenExpiresAt || new Date(this.fbTokenExpiresAt) < this.clock.getTime)
	};

	@computed get fbAuthIsPerformed() {
		return (this.fbToken && this.fbId && this.fbTokenExpiresAt)
	};


	@action setAuthData = ({fbToken, fbTokenExpiresAt, fbId}) => {
		Object.assign(this, {fbToken, fbTokenExpiresAt, fbId})
	};

	@action setTinderToken = (token) => {
		this.tinderToken = token;
	};

	@action setTinderIsAuthorized = (flag) => {
		this.tinderIsAuthorized = flag;
	};

	@action setUpdatePending = (flag) => {
		this.updatePending = flag
	};

	@action setTinderDefaults = (defaults) => {
		this.tinderDefaults = defaults;
	}

	@action loginWithFB	= loginWithFB.bind(this);
	@action authorize	= authorize.bind(this);
	@action getHistory	= getHistory.bind(this);
	@action getProfile	= getProfile.bind(this);
	@action getUpdates	= getUpdates.bind(this);
	@action getUser		= getUser.bind(this);
	@action notifyMessage = notifyMessage.bind(this);
	@action sendMessage = sendMessage.bind(this);
	@action getDefaults = getDefaults.bind(this);
	logOut 				= logOut.bind(this);
	@action login 		= login(this);


	constructor({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken, retrieve = retrieveFromApi, tinderDefaults}) {
		Object.assign(this, {clock, fbToken, fbTokenExpiresAt, fbId, tinderToken, tinderDefaults, retrieve});
		// this.retrieve = retrieve || retrieveFromApi;
		// window.retrieve = this.retrieve;
	};
}