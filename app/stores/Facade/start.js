import {API_REQUIRE_AUTHORIZATION, VIEW_AUTH} from 'app/constants'


export default async function start() {
	this.startAutoSave(this.save);
	this.ipc.on(API_REQUIRE_AUTHORIZATION, this.login);

	if (this.api.fbAuthIsPerformed) {
		await this.api.authorize();
		await this.startListeners();
	} else if (this.view.currentView.name !== VIEW_AUTH) {
		this.goToAuth();
	}
}