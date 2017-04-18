// @flow
import {success} from '../utils'
const fbError = new Error('FB login is required');

export async function login(obj, args, ctx) {
    // TODO: add offline checks
    const {fb, tinder} = ctx;
    let status = await tinder.isAuthorized();
    if (status) {
        return success
    } else {
        try {
            if (fb.token === undefined || fb.id === undefined) {
                throw fbError;
            }
            await tinder.authorize({fbToken: fb.token, fbId: fb.id});
            status = await tinder.isAuthorized();
            if (status) {
                return success
            } else {
                throw fbError;
            }
        } catch(err) {
            try {
                await fb.login(args.silent);
                await tinder.authorize({fbToken: fb.token, fbId: fb.id});
            } catch (err) {
                console.error(err);
            }

            status = await tinder.isAuthorized();
            if (status) {
                return success
            } else {
                if (!args.silent) {
                    throw new Error('Impossible to authorize Tinder client');
                } else {
                    return {status: 'Unauthorized'}
                }
            }
        }
    }
}