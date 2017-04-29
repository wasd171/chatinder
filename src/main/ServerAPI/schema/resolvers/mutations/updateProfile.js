// @flow
import type {ServerAPI} from '~/main/ServerAPI'
import {profile} from '../queries'
import Bluebird from 'bluebird'


type Arguments = {
}

export async function updateProfile(obj: void, args: Arguments, ctx: ServerAPI) {
    await Bluebird.fromCallback(callback => ctx.db.extra.update(
        {_id: 'profile'},
        {$set: {recent: false}},
        {},
        callback
    ));
    return profile(obj, args, ctx);
}