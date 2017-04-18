import {Navigator} from './Navigator'
import {View} from './View'
import {Time} from './Time'
import {Caches} from './Caches'
import getInitialState from './getInitialState'
import loginSilent from './loginSilent'


export async function configureStores(client) {
    await client.mutate({mutation: loginSilent});
    const time = new Time();
    const view = new View();
    const navigator = new Navigator();
    await navigator.start({view, client});
    const caches = new Caches();

    return {view, navigator, time, caches}
}