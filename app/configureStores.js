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


async function configureStores({API, Clock, TinderStore, ViewStore, DB}) {
	const db = new DB();
	const {fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, profile, matches, tinderDefaults} = await db.getInitial();

	const clock = new Clock();
	const view = new ViewStore({currentView});
	const api = new API({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken, tinderDefaults});
	const tinder = new TinderStore({matches, profile});

	const facade = FacadeFactory({clock, api, view, tinder, db});
	await facade.start();
	return facade;
}

export default configureStores