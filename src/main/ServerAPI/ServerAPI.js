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
import configureDatabasesFactory from './configureDatabasesFactory'


interface IDbStore {
    extra: Nedb,
    matches: Nedb,
    pending: Nedb
}

export class ServerAPI {
    app: AppManager;
    schema: any;
    db: IDbStore;
    fb: FB;
    tinder: TinderAPI;
    refetcher: Refetcher;
    reloginInterval: number | null = null;
    reloginCallbacks: null | Array<Function> = null;

    constructor() {
        this.schema = createSchema();
        let predicate;
        if (process.env.NODE_ENV === 'development') {
            predicate = join(__dirname, '..', 'databases');
        } else {
            predicate = join(__dirname, '..', '..', '..', '..', 'app.asar.unpacked', 'src', 'main', 'databases');
        }
        const extra = new Nedb({filename: join(predicate, 'extra.db')});
        const matches = new Nedb({filename: join(predicate, 'matches.db')});
        const pending = new Nedb({filename: join(predicate, 'pending.db')});
        this.db = {
            extra,
            matches,
            pending
        }
    }

    start = startFactory(this);
    callGraphQL = callGraphQLFactory(this);
    processRequest = processRequestFactory(this);
    generateMessage = generateMessage;
    configureDatabases = configureDatabasesFactory(this);
}