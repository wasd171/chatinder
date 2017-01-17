export default async function login(force) {
	await this.api.loginWithFB();
	await this.api.authorize(force);
}