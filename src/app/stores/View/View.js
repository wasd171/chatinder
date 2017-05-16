import { observable, action, computed } from 'mobx'

export class View {
	@observable name
	@observable params

	@computed get pathNodes() {
		if (!this.name) {
			return []
		} else {
			return this.name.split('.')
		}
	}

	@action.bound setCurrentView({ name, params }) {
		if (this.name !== name) {
			this.params = params
		} else {
			Object.keys(this.params).forEach(key => {
				if (!params[key]) {
					delete this.params[key]
				}
			})
			Object.assign(this.params, params)
		}
		this.name = name
	}
}
