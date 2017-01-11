export default async function login() {
	await this.api.loginWithFB();
	await this.api.authorize();
}