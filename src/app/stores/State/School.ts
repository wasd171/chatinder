import { types } from 'mobx-state-tree'

export const School = types.model('School', {
	name: types.string,
	id: types.maybe(types.string)
})
