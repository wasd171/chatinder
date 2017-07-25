import { types } from 'mobx-state-tree'
import { Person, Globals } from '.'

export const Defaults = types.model('Defaults', {
	token: types.string,
	user: Person,
	globals: Globals
})
