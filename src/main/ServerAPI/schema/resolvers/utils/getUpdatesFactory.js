// @flow
import type {ServerAPI} from 'main/ServerAPI'
import {relogin} from './relogin'
import Bluebird from 'bluebird'


export function getUpdatesFactory({ctx, handler}: {ctx: ServerAPI, handler: Function}) {
    return async function getUpdates(): Promise<void> {
        const {tinder} = ctx;

        if (!tinder.subscriptionPending) {
            tinder.subscriptionPending = true;
            
            async function _getUpdates(callback: Function) {
                try {
                    const updates = await tinder.getUpdates();
                    handler(updates);
                    tinder.subscriptionPending = false;
                    callback();
                } catch (err) {
                    await relogin(ctx);
                    _getUpdates(callback);
                }
            }
            
            await Bluebird.fromCallback(callback => _getUpdates(callback));
        }
    }
}