import Promise from 'bluebird'
import {whenLoggedIn} from 'app/utils'


export class Actions {
    api;
    navigator;

    constructor({api, navigator, tinder}) {
        this.api = api;
        this.navigator = navigator;
        this.tinder = tinder;
    }

    async initialLogin() {
        this.navigator.goToLoading('Logging in');
        await this.api.login();
        this.navigator.goToLoading('Fetching data');
        // TODO: Would not be needed when integrated with GraphQL in v2
        await whenLoggedIn(this.tinder);
        this.navigator.goToMain();
    }
}