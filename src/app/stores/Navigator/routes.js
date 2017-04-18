import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING} from '~/app/constants';
import {canActivateAuth, canActivateMain} from './lifecycle'


const auth = {
    name: VIEW_AUTH, 
    path: `/${VIEW_AUTH}`, 
    canActivate: canActivateAuth
};

const chat = {
    name: VIEW_CHAT, 
    path: `/:id/${VIEW_CHAT}`
};

const user = {
    name: VIEW_USER, 
    path: `/:id/${VIEW_USER}`
};

const main = {
    name: VIEW_MAIN, 
    path: `/${VIEW_MAIN}`, 
    canActivate: canActivateMain,
    children: [
        chat,
        user
    ]
}

const loading = {
    name: VIEW_LOADING, 
    path: `/${VIEW_LOADING}/:title`
}

export const routes = [
    auth,
    main,
    loading
]

export const defaultRoute = auth.path;