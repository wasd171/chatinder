// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'


type Arguments = {
    fbToken: string,
    fbId: string
}

export default function authorizeFactory(instance: TinderAPI) {
    return function authorize({fbToken, fbId}: Arguments) {
        return Promise.fromCallback(callback => instance.client.authorize(fbToken, fbId, callback));
    }
}