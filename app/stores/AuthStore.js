import {observable, action, computed} from 'mobx'


export class AuthStore {
	@observable fbToken;
	@observable fbTokenExpiresAt;
	@observable fbId;
	@observable tinderToken;
	@observable tinderIsAuthorized = false;
	clock;

	constructor({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken}) {
		Object.assign(this, {clock, fbToken, fbTokenExpiresAt, fbId, tinderToken});
	}

	@action setToken = (token) => {
		this.fbToken = token;
	};

	@action setExpiresAt = (expiresIn) => {
		this.fbTokenExpiresAt = Date.now() + 1000*expiresIn;
	};

	@action setId = (id) => {
		this.fbId = id;
	};

	@action setTinderToken = (tinderToken) => {
		this.tinderToken = tinderToken;
	};

	@action setTinderIsAuthorized = (value) => {
		this.tinderIsAuthorized = value;
	};

	@computed get hasFbTokenExpired() {
		return (!this.fbTokenExpiresAt || new Date(this.fbTokenExpiresAt) < this.clock.getTime)
	};

	@computed get fbAuthIsPerformed() {
		return (this.fbToken && this.fbId && this.fbTokenExpiresAt)
	}
}