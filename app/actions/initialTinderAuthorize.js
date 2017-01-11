export default async function initialTinderAuthorize({auth, authorizeTinderWithToken, authorizeTinder}) {
	const {authToken, hasFbTokenExpired} = auth;
	if (authToken) {
		await authorizeTinderWithToken();
	} else if (!hasFbTokenExpired) {
		const token = await authorizeTinder();
		await auth.setTinderToken(token);
	}
}