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
					() => this.clock.getTime(),
					async (time) => {
						const userId = this.tinder.matches.get(matchId).person['_id'];
						const res = await this.api.getUser({userId, matchId});
						if (res) {
							const match = this.tinder.matches.get(res.matchId);
							match.person.updatePerson(res.results);
							if (this.view.newChatSelected && match['_id'] === matchId) {
								this.view.setNewChatSelected(false);
							}
						}
					},
					true
				)
			}
		},
		true
	)
}