import createRouter from 'router5'
import isAuthorized from './isAuthorized'
import {routes, defaultRoute} from './routes'
import {saveToMobX} from './middleware'
import Promise from 'bluebird'


export async function configureRouter({view, client}) {
    const status = await isAuthorized(client);
    const router = createRouter()
        .setDependencies({view, client, initialStatus: status})
        .add(routes)
        .useMiddleware(saveToMobX)

    await Promise.fromCallback(callback => router.start(defaultRoute, callback));
    console.log('created router');
    return router
}