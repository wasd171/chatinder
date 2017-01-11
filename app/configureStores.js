import localforage from 'localforage'
import Promise from 'bluebird'
import {
	LF_FB_TOKEN_EXPIRES_AT,
	LF_FB_TOKEN,
	LF_FB_ID,
	LF_TINDER_TOKEN,
	LF_CURRENT_VIEW,
	LF_TINDER_MATCHES,
	LF_TINDER_PROFILE
} from './constants'
import {FacadeFactory} from './stores/Facade'

// async function configureStores({AuthStore, Clock, TinderStore, ViewStore}) {
// 	'use strict';
//
// 	const [fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, matches, profile] = await Promise.all([
// 		localforage.getItem(LF_FB_TOKEN),
// 		localforage.getItem(LF_FB_TOKEN_EXPIRES_AT),
// 		localforage.getItem(LF_FB_ID),
// 		localforage.getItem(LF_TINDER_TOKEN),
// 		localforage.getItem(LF_CURRENT_VIEW),
// 		localforage.getItem(LF_TINDER_MATCHES),
// 		localforage.getItem(LF_TINDER_PROFILE)
// 	]);
//
// 	const clock = new Clock();
// 	const view = new ViewStore({currentView});
// 	const auth = new AuthStore({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken});
// 	const tinder = new TinderStore({matches, profile});
//
// 	return {clock, auth, view, tinder}
// }

async function configureStores({API, Clock, TinderStore, ViewStore}) {
	const [fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, matches, profile] = await Promise.all([
		localforage.getItem(LF_FB_TOKEN),
		localforage.getItem(LF_FB_TOKEN_EXPIRES_AT),
		localforage.getItem(LF_FB_ID),
		localforage.getItem(LF_TINDER_TOKEN),
		localforage.getItem(LF_CURRENT_VIEW),
		localforage.getItem(LF_TINDER_MATCHES),
		localforage.getItem(LF_TINDER_PROFILE)
	]);

	const clock = new Clock();
	const view = new ViewStore({currentView});
	const api = new API({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken});
	const tinder = new TinderStore({matches, profile});

	const facade = FacadeFactory({clock, api, view, tinder});
	await facade.start();
	return facade;
}

export default configureStores