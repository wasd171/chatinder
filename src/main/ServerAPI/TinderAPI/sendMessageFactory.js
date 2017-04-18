// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'


export default function sendMessageFactory(instance: TinderAPI) {
    return function sendMessage(id: string, message: string) {
        return Promise.fromCallback(callback => instance.client.sendMessage(id, message, callback))
    }
}