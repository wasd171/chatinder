import { fromCallback } from '~/shared/utils'

export function count(db: Nedb, query: Object): Promise<number> {
	return fromCallback(callback => db.count(query, callback))
}
