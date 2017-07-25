import { types } from 'mobx-state-tree'

export const Globals = types.model('Globals', {
	updates_interval: types.number
})
