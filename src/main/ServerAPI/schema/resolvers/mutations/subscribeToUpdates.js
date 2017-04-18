// @flow
import type {ServerAPI} from '~/main/ServerAPI'
import {success, handleUpdatesFactory} from '../utils'


type Arguments = {
}

export async function subscribeToUpdates(obj: any, args: Arguments, ctx: ServerAPI) {
    const handler = handleUpdatesFactory(ctx);
    ctx.tinder.subscribeToUpdates(handler);
    return success
}