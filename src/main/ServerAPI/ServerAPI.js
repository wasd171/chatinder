// @flow
import type{AppManager} from './AppManager'
import type {FB} from './FB'
import type {TinderAPI} from './TinderAPI'
import type {Refetcher} from './Refetcher'

import {createSchema} from './schema'
import Nedb from 'nedb'
import {join} from 'path'

import startFactory from './startFactory'
import callGraphQLFactory from './callGraphQLFactory'
import processRequestFactory from './processRequestFactory'
import generateMessage from './generateMessage'


interface IDbStore {
    extra: Nedb,
    matches: Nedb
}

export class ServerAPI {
    app: AppManager;
    schema: any;
    db: IDbStore;
    fb: FB;
    tinder: TinderAPI;
    refetcher: Refetcher;

    constructor() {
        this.schema = createSchema();
        const extra = new Nedb({filename: join(__dirname, 'databases', 'extra.db')});
        const matches = new Nedb({filename: join(__dirname, 'databases', 'matches.db')});
        this.db = {
            extra,
            matches
        }
    }

    start = startFactory(this);
    callGraphQL = callGraphQLFactory(this);
    processRequest = processRequestFactory(this);
    generateMessage = generateMessage;
}