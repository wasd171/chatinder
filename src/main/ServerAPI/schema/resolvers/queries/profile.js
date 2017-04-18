// @flow
import Promise from 'bluebird'


export async function profile(obj, args, ctx) {
    let profile = await Promise.fromCallback(callback => ctx.db.extra.findOne({_id: 'profile'}, callback));
    if (profile !== null) {
        return profile
    } else {
        profile = await ctx.tinder.getProfile();
        profile = Object.assign({_id: 'profile'}, profile);
        await Promise.fromCallback(callback => ctx.db.extra.insert(profile, callback));
        return profile
    }
}