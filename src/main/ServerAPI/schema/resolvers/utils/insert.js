// @flow
import BPromise from 'bluebird'

export function insert(db, query) {
	return BPromise.fromCallback(callback => db.insert(query, callback))
}
