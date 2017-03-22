import Promise from 'bluebird'
import {DB} from './DB'
import {Clock} from './Clock'
import {Tinder} from './Tinder'
import {View} from './View'
import {API} from './API'
import {ServerListeners} from './ServerListeners'
import {Navigator} from './Navigator'
import {Actions} from './Actions'
// import {FacadeFactory} from './stores/Facade'


export async function configureStores() {
	const db = new DB();
	const {fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, profile, matches, tinderDefaults} = await db.getInitial();

	const clock = new Clock();
	const tinder = new Tinder({matches, profile});
	const view = new View({currentView});
	const api = new API({clock, fbToken, fbTokenExpiresAt, fbId, tinderToken, tinderDefaults});
	const server = new ServerListeners({api, tinder, db, clock, view});
	const navigator = new Navigator({view, server, api, currentView});
	const actions = new Actions({api, navigator, tinder});

	return {clock, tinder, view, api, server, navigator, actions};
	// const facade = FacadeFactory({clock, api, view, tinder, db});
	// await facade.start();
	// return facade;
}