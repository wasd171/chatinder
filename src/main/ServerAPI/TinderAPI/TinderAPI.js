// @flow
import {TinderClient} from 'tinder'
import isAuthorizedFactory from './isAuthorizedFactory'
import getDefaultsFactory from './getDefaultsFactory'
import getProfileFactory from './getProfileFactory'
import authorizeFactory from './authorizeFactory'
import getHistoryFactory from './getHistoryFactory'
import sendMessageFactory from './sendMessageFactory'
import getPersonFactory from './getPersonFactory'
import subscribeToUpdatesFactory from './subscribeToUpdatesFactory'
import getUpdatesFactory from './getUpdatesFactory'


type Interval = number | null;

export class TinderAPI {
    client: TinderClient;
    subscriptionInterval: Interval = null;
    subscriptionPending: boolean = false;

    constructor() {
        this.resetClient();
    }

    resetClient = () => {
        this.client = new TinderClient();
    }

    isAuthorized = isAuthorizedFactory(this);
    getDefaults = getDefaultsFactory(this);
    getProfile = getProfileFactory(this);
    authorize = authorizeFactory(this);
    getHistory = getHistoryFactory(this);
    sendMessage = sendMessageFactory(this);
    getPerson = getPersonFactory(this);
    subscribeToUpdates = subscribeToUpdatesFactory(this);
    getUpdates = getUpdatesFactory(this);
}