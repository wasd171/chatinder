// @flow
import {TinderAPI} from './TinderAPI'


export default function getUpdatesFactory(instance: TinderAPI) {
    return function getUpdates(callback: Function) {
        instance.client.getUpdates(callback);
    }
}