import Promise from 'bluebird'
import {ipcRenderer} from 'electron'
import {API_REQUIRE_AUTHORIZATION, API_GET_PROFILE_SUCCESS, API_GET_USER_SUCCESS, API_GET_UPDATES_SUCCESS, API_GET_HISTORY_SUCCESS} from 'app/constants'
import {reaction} from 'mobx'
import {whenLoggedIn} from 'app/utils'


export class ServerListeners {
    api;
    tinder;
    db;
    clock;
    ipc;

    updateDisposer;
    updatePersonWrappedDisposer;
    updatePersonDisposer;
    
    constructor({api, tinder, db, clock, view, ipc = ipcRenderer}) {
        this.api = api;
        this.tinder = tinder;
        this.db = db;
        this.clock = clock;
        this.view = view;
        this.ipc = ipc;

        this.startListeners();
        whenLoggedIn(this.tinder).then(this.startQueries);
    }

    async handleGetProfile(event, arg) {
        const savedProfile = await this.db.saveProfile(arg.user);
	    this.tinder.setProfile(savedProfile);
    }

    async handleGetPerson(event, arg) {
        if (arg.status === 200) {
            const {matchId, user} = await this.db.savePerson(arg.results);
            this.tinder.matches.get(matchId).person.updatePerson(user);
        }
    }

    async handleGetUpdates(event, arg) {
        if (arg && arg.matches && arg.matches.length > 0) {
            const matches = await this.db.saveUpdates(arg);
            matches.forEach(match => {
                const localMatch = this.tinder.matches.get(match['_id']);
                if (localMatch) {
                    localMatch.updateMatch(match);
                    match.messages.forEach(message => {
                        if (message.from !== this.tinder.profile['_id']) {
                            this.api.notifyMessage(localMatch.person, message.originalMessage);
                        }
                    });
                } else {
                    this.tinder.matches.setMatches([match]);
                    this.api.notifyMessage(match.person, 'New match!');
                }
            })
        }
    }

    async handleGetHistory(event, arg) {
        const matches = await this.db.setMatches(arg);
        await this.tinder.setMatches(matches);
    }

    startListeners() {
        this.ipc.on(API_REQUIRE_AUTHORIZATION, this.api.login);
        this.ipc.on(API_GET_PROFILE_SUCCESS, this.handleGetProfile.bind(this));
        this.ipc.on(API_GET_USER_SUCCESS, this.handleGetPerson.bind(this));
        this.ipc.on(API_GET_UPDATES_SUCCESS, this.handleGetUpdates.bind(this));
        this.ipc.on(API_GET_HISTORY_SUCCESS, this.handleGetHistory.bind(this));
    }

    requestUpdates() {
        if (!this.updateDisposer) {
            this.updateDisposer = reaction(
                () => this.clock.time,
                () => this.api.getUpdates()
            );
        }
    }

    requestUserUpdates() {
        this.updatePersonWrappedDisposer = reaction(
            () => this.view.currentView.params.matchId,
            (matchId) => {
                if (this.updatePersonDisposer) {
                    this.updatePersonDisposer();
                    this.updatePersonDisposer = null;
                }
                if (matchId) {
                    this.updatePersonDisposer = reaction(
                        () => this.clock.time,
                        () => this.api.getUser(this.tinder.matches.get(matchId).person['_id']),
                        true
                    )
                }
            },
            true
        )
    }

    startQueries() {
        this.requestUpdates();
        this.requestUserUpdates();
    }
}