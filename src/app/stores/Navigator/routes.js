import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING, VIEW_OFFLINE} from '~/shared/constants'
import {nameToPath} from '~/shared/utils'


const auth = {
    name: VIEW_AUTH, 
    path: nameToPath(VIEW_AUTH)
};

const chat = {
    name: VIEW_CHAT, 
    path: nameToPath(VIEW_CHAT)
};

const user = {
    name: VIEW_USER, 
    path: nameToPath(VIEW_USER)
};

const main = {
    name: VIEW_MAIN, 
    path: nameToPath(VIEW_MAIN),
    children: [
        chat,
        user
    ]
}

const offline = {
    name: VIEW_OFFLINE,
    path: nameToPath(VIEW_OFFLINE)
}

const loading = {
    name: VIEW_LOADING, 
    path: nameToPath(VIEW_LOADING)
}

export const routes = [
    auth,
    main,
    offline,
    loading
]