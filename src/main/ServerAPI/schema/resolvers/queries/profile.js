// @flow
import Bluebird from 'bluebird'
import {normalizePerson, relogin} from '../utils'


export async function profile(obj, args, ctx) {
    let profile = await Bluebird.fromCallback(callback => ctx.db.extra.findOne({_id: 'profile', recent: true}, callback));
    if (profile !== null) {
        return profile
    } else {
        async function _updateProfile(callback: Function) {
            try {
                const profile = await ctx.tinder.getProfile();
                callback(null, profile);
            } catch (err) {
                await relogin(ctx);
                _updateProfile(callback);
            }
        }

        profile = await Bluebird.fromCallback(callback => _updateProfile(callback));
        profile = Object.assign({_id: 'profile', recent: true}, profile);
        profile.user = normalizePerson(profile.user);
        await Bluebird.fromCallback(callback => ctx.db.extra.remove({_id: 'profile'}, {}, callback));
        await Bluebird.fromCallback(callback => ctx.db.extra.insert(profile, callback));
        return profile
    }
}