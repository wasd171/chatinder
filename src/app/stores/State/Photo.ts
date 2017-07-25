import { types } from 'mobx-state-tree'
import { ProcessedFile } from '.'

export const Photo = types.model('Photo', {
	id: types.identifier(types.string),
	url: types.string,
	processedFiles: types.array(ProcessedFile)
})
