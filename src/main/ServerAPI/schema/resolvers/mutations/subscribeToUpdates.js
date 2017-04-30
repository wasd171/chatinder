// @flow
import type {ServerAPI} from 'main/ServerAPI'
import {success, getUpdatesFactory, handleUpdatesFactory} from '../utils'
import {relogin} from '../utils'


type Arguments = {
}

export async function subscribeToUpdates(obj: any, args: Arguments, ctx: ServerAPI) {
    const {tinder} = ctx;
    const handler = handleUpdatesFactory(ctx);
    const getUpdates = getUpdatesFactory({ctx, handler});

    if (tinder.subscriptionInterval !== null) {
        clearInterval(tinder.subscriptionInterval);
        tinder.subscriptionInterval = null;
    }

    let defaults = tinder.getDefaults();
    if (defaults === null) {
        await relogin(ctx);
        defaults = tinder.getDefaults();
    }


    const interval = defaults.globals.updates_interval;
    tinder.subscriptionInterval = setInterval(getUpdates, interval);

    return success
}