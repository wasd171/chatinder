import createRouter from 'router5'
import {routes} from './routes'
import {saveToMobX} from './middleware'
import Promise from 'bluebird'
import initialRoute from './initialRoute.graphql'


export async function configureRouter({view, client}) {
    const router = createRouter()
        .setDependencies({view})
        .add(routes)
        .useMiddleware(saveToMobX);

    const {data} = await client.query({query: initialRoute});
    await Promise.fromCallback(callback => router.start(data.initialRoute, callback));
    const newState = router.getState();
    return router
}