// @flow
import BPromise from 'bluebird'


export function count(db, query): Promise<number> {
    return BPromise.fromCallback(callback => db.count(query, callback));
}