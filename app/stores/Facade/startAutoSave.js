import {
	LF_FB_TOKEN,
	LF_FB_TOKEN_EXPIRES_AT,
	LF_FB_ID,
	LF_TINDER_TOKEN,
	LF_CURRENT_VIEW,
	LF_TINDER_MATCHES,
	LF_TINDER_PROFILE,
	LF_TINDER_DEFAULTS
} from 'app/constants'
import {autorun, toJS} from 'mobx'


export default function startAutoSave(save) {
	'use strict';

	autorun(() => this.db.saveToDB('auth', LF_FB_TOKEN, this.api.fbToken));
	autorun(() => this.db.saveToDB('auth', LF_FB_TOKEN_EXPIRES_AT, this.api.fbTokenExpiresAt));
	autorun(() => this.db.saveToDB('auth', LF_FB_ID, this.api.fbId));
	autorun(() => this.db.saveToDB('auth', LF_TINDER_TOKEN, this.api.tinderToken));
	autorun(() => this.db.saveToDB('saved', LF_CURRENT_VIEW, toJS(this.view.currentView)));
	autorun(() => this.db.saveToDB('saved', LF_TINDER_DEFAULTS, toJS(this.api.tinderDefaults)));
	// autorun(() => save(LF_TINDER_MATCHES,		this.tinder.matches));
	// autorun(() => this.db.saveToDB('saved', LF_TINDER_PROFILE, this.tinder.profile));
}