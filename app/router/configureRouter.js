import createRouter from 'router5'
import {routes, defaultRoute} from './routes'
import {saveToMobX} from './middleware'


export function configureRouter({store}) {
    const router = createRouter(routes, {defaultRoute}, {store});
    router.useMiddleware(saveToMobX);

    return router;
}