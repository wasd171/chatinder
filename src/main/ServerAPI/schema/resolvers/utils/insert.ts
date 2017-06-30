import { fromCallback } from '~/shared/utils'

export function insert(db: Nedb, query: Object) {
	return fromCallback(callback => db.insert(query, callback))
}
