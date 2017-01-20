export default async function handleLoginButtonClick() {
	this.goToLoading('Logging in');
	await this.login();
	this.goToLoading('Fetching history');
	const history = await this.api.getHistory();
	console.log(history);
	const matches = await this.db.setMatches(history);
	console.log({matches});
	this.tinder.setMatches(matches);
	console.log('startListeners');
	await this.startListeners();
	console.log('goToMain');
	this.goToMain();
}