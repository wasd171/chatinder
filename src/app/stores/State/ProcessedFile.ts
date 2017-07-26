import { types } from 'mobx-state-tree'

export const ProcessedFile = types.model('ProcessedFile', {
	width: types.number,
	url: types.string,
	height: types.number
})
