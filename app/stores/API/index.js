import {observable, action, computed} from 'mobx'
import {retrieveFromApi} from 'app/utils'

import loginWithFB from './loginWithFB'
import authorize from './authorize'
import getHistory from './getHistory'
import getProfile from './getProfile'
import getUpdates from './getUpdates'
import getUser from './getUser'
import notifyMessage from './notifyMessage'


export class API {
	@observable fbToken;
	@observable fbTokenExpiresAt;
	@observable fbId;
	@observable tinderToken;
	@observable tinderIsAuthorized = false;
	@observable updatePending = false;
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

	@action loginWithFB	= loginWithFB.bind(this);
	@action authorize	= authorize.bind(this);
	@action getHistory	= getHistory.bind(this);
	@action getProfile	= getProfile.bind(this);
	@action getUpdates	= getUpdates.bind(this);
	@action getUser		= getUser.bind(this);
	@action notifyMessage = notifyMessage.bind(this);


	constructor({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken, retrieve}) {
		Object.assign(this, {clock, fbToken, fbTokenExpiresAt, fbId, tinderToken});
		this.retrieve = retrieve || retrieveFromApi;
	};
}