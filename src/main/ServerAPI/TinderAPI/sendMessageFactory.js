// @flow
import type {TinderAPI} from './TinderAPI'


export default function sendMessageFactory(instance: TinderAPI) {
    return function sendMessage(id: string, message: string) {
        return instance.client.sendMessage({matchId: id, message})
    }
}