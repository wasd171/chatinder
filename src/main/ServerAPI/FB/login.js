// @flow
import {FB} from './FB'


export default function login(instance: FB) {
    return async function(silent: boolean) {
        try {
            await instance.getId();
        } catch(err) {
            return instance.loginForce(silent);
        }
    }
}