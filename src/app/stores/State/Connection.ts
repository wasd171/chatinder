import { types } from 'mobx-state-tree'

export const Connection = types.model('Connection', {
	id: types.string,
	name: types.string,
	photo: types.model('ConnectionPhoto', {
		small: types.string
	})
})
