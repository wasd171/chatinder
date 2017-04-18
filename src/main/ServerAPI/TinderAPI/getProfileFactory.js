// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'


export default function getProfileFactory(instance: TinderAPI) {
    return function getProfile() {
        return Promise.fromCallback(instance.client.getAccount);
    }
}