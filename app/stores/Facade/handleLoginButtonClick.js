export default async function handleLoginButtonClick() {
	this.goToLoading('Logging in');
	await this.login();
	this.goToLoading('Fetching history');
	const history = await this.api.getHistory();
	console.log(history);
	this.tinder.setMatches({matches: history.matches, raw: true});
	console.log('startListeners');
	await this.startListeners();
	console.log('goToMain');
	this.goToMain();
}