import Promise from 'bluebird'
import isAuthorized from './isAuthorized'
import {VIEW_MAIN, VIEW_AUTH} from '~/shared/constants'


export const canActivateAuth = (router, ctx) => async (toState, fromState, done) => {
    const status = ctx.initialStatus || await isAuthorized(ctx.client);
    console.log({func: 'auth', status, initialStatus: ctx.initialStatus});

    if (!status) {
        done();
    } else {
        done({redirect: {name: VIEW_MAIN}})
    }

    if (ctx.initialStatus !== undefined) {
        delete ctx.initialStatus
    }
}

export const canActivateMain = (router, ctx) => async (toState, fromState, done) => {
    if (ctx.view.pathNodes.length !== 0 && ctx.view.pathNodes[0] === VIEW_MAIN) {
        // Probably if you already were in VIEW_MAIN, you are already authorized
        done();
    }

    const status = ctx.initialStatus || await isAuthorized(ctx.client);
    console.log({func: 'main', status, initialStatus: ctx.initialStatus});

    if (status) {
        done();
    } else {
        done({redirect: {name: VIEW_AUTH}})
    }

    if (ctx.initialStatus !== undefined) {
        delete ctx.initialStatus
    }
}