// @flow
import type {ServerAPI} from '~/main/ServerAPI'
import {relogin} from './relogin'


export function getUpdatesFactory({ctx, handler}: {ctx: ServerAPI, handler: Function}) {
    return async function getUpdates(): Promise<void> {
        const {tinder} = ctx;

        if (!tinder.subscriptionPending) {
            tinder.subscriptionPending = true;
            
            try {
                const updates = await tinder.getUpdates();
                handler(updates);
                tinder.subscriptionPending = false;
            } catch (err) {
                await relogin(ctx);
                const updates = await tinder.getUpdates();
                handler(updates);
                tinder.subscriptionPending = false;
            }
        }
    }
}