export function login(instance) {
    return async function(force) {
        await instance.api.loginWithFB();
	    await instance.api.authorize(force);
    }
}