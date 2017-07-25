import { types } from 'mobx-state-tree'

export const Job = types.model('Job', {
	company: types.maybe(
		types.model('JobCompany', {
			name: types.string
		})
	),
	title: types.maybe(
		types.model('JobTitle', {
			name: types.string
		})
	)
})
