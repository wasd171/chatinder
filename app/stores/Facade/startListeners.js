export default async function startListeners() {
	if (!this.tinder.isProfilePresent) {
		const {user} = await this.api.getProfile();
		this.tinder.setProfile(user);
	}
	this.startAutoUpdate();
	this.startAutoUpdatePerson();
}