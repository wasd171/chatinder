// @flow
import {TinderAPI} from './TinderAPI'


export default function subscribeToUpdatesFactory(instance: TinderAPI) {
    return function subscribeToUpdates(handler: Function) {
        if (typeof instance.subscriptionInterval === 'number') {
            clearInterval(instance.subscriptionInterval);
        }

        function subscriber() {
            if (!instance.subscriptionPending) {
                instance.subscriptionPending = true;
                instance.getUpdates(handler);
            }
        }

        const interval = instance.getDefaults().globals.updates_interval;
        instance.subscriptionInterval = setInterval(subscriber, interval);
    }
}