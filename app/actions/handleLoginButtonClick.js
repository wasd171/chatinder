export default async function handleLoginButtonClick({showLoading, showMain, loginWithFacebook, initialTinderAuthorize}) {
	showLoading('Logging in with Facebook');
	await loginWithFacebook();
	showLoading('Performing Tinder authentication');
	await initialTinderAuthorize();
	showMain();
	console.log('OK');
}