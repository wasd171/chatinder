// @flow
import {AppManager} from '../AppManager'
import {SUBSCRIPTION_MATCHES_ALL, SUBSCRIPTION_MATCH} from 'shared/constants'


export class Refetcher {
    app: AppManager;

    constructor(app: AppManager) {
        this.app = app;
    }

    notifyAllMatches() {
        this.app.window.webContents.send(SUBSCRIPTION_MATCHES_ALL);
    }

    notifyMatch(id: string) {
        this.app.window.webContents.send(SUBSCRIPTION_MATCH, {id});
    }
}