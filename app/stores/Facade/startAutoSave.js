import {
	LF_FB_TOKEN,
	LF_FB_TOKEN_EXPIRES_AT,
	LF_FB_ID,
	LF_TINDER_TOKEN,
	LF_CURRENT_VIEW,
	LF_TINDER_MATCHES,
	LF_TINDER_PROFILE
} from 'app/constants'
import {autorun} from 'mobx'


export default function startAutoSave(save) {
	'use strict';

	autorun(() => save(LF_FB_TOKEN,				this.api.fbToken));
	autorun(() => save(LF_FB_TOKEN_EXPIRES_AT,	this.api.fbTokenExpiresAt));
	autorun(() => save(LF_FB_ID,				this.api.fbId));
	autorun(() => save(LF_TINDER_TOKEN,			this.api.tinderToken));
	autorun(() => save(LF_CURRENT_VIEW,			this.view.currentView));
	autorun(() => save(LF_TINDER_MATCHES,		this.tinder.matches));
	autorun(() => save(LF_TINDER_PROFILE,		this.tinder.profile));
}