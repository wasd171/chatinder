// @flow
import {FB} from './FB'


export default function loginForce(instance: FB) {
    return async function(silent: boolean) {
        const {token, expiresIn} = await instance.getToken(silent);
        instance.setToken(token);
        instance.setExpiration(Date.now() + 1000*expiresIn);
        const id = await instance.getId();
        instance.setId(id);
    }
}