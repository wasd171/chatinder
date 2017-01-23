import {autorun, reaction} from 'mobx'


export default function startAutoUpdatePerson() {
	this.updatePersonWrappedDisposer = reaction(
		() => {
			if (this.view.currentView.params && this.view.currentView.params.matchId) {
				return this.view.currentView.params.matchId
			} else {
				return null
			}
		},
		(matchId) => {
			if (this.updatePersonDisposer) {
				this.updatePersonDisposer();
				this.updatePersonDisposer = null;
			}
			if (matchId) {
				this.view.setNewChatSelected(true);
				this.updatePersonDisposer = reaction(
					() => this.time,
					() => this.api.getUser(this.tinder.matches.get(matchId).person['_id']),
					true
				)
			}
		},
		true
	)
}