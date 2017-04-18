// @flow
import {success} from '../utils'
import Promise from 'bluebird'


export async function logout(obj, args, ctx) {
    await Promise.all([
        ctx.fb.setToken(null),
        ctx.fb.setId(null),
        ctx.fb.setExpiration(null),
        ctx.tinder.resetClient(),
        ctx.app.logout(),
    ]);
    ctx.app.reload();
    return success
}