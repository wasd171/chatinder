// @flow
import {TinderAPI} from './TinderAPI'
import Promise from 'bluebird'


export default function getHistoryFactory(instance: TinderAPI) {
    return function getHistory() {
        return Promise.fromCallback(instance.client.getHistory)
    }
}