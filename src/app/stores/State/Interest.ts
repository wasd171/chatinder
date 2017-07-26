import { types } from 'mobx-state-tree'

export const Interest = types.model('Interest', {
	name: types.string,
	id: types.string
})
