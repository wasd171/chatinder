// @flow
import type {ServerAPI} from './ServerAPI'
import Bluebird from 'bluebird'
import {PENDING, FAILURE} from '~/shared/constants'


export default function configureDatabasesFactory(instance: ServerAPI) {
    return async function configureDatabases(): Promise<void> {
        const {db} = instance;
        await Promise.all([
            Bluebird.fromCallback(callback => db.extra.loadDatabase(callback)),
            Bluebird.fromCallback(callback => db.matches.loadDatabase(callback)),
            Bluebird.fromCallback(callback => db.pending.loadDatabase(callback))
        ]);

        await Bluebird.fromCallback(callback => db.pending.update(
            {status: PENDING}, 
            {$set: {status: FAILURE}},
            {multi: true},
            callback
        ));
    }
}