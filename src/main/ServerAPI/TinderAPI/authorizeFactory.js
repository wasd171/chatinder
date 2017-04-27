// @flow
import type {TinderAPI} from './TinderAPI'


type Arguments = {
    fbToken: string,
    fbId: string
}

export default function authorizeFactory(instance: TinderAPI) {
    return function authorize({fbToken, fbId}: Arguments) {
        return instance.client.authorize({fbToken, fbId});
    }
}