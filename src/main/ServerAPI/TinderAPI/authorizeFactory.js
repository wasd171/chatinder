// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'

export default function authorizeFactory(instance: TinderAPI) {
    return function authorize({fbToken, fbId}: {fbToken: string, fbId: string}) {
        return Promise.fromCallback(callback => instance.client.authorize(fbToken, fbId, callback));
    }
}