import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING} from 'app/constants';


export const routes = [
    {name: VIEW_AUTH, path: `/${VIEW_AUTH}`},
    {name: VIEW_MAIN, path: `/${VIEW_MAIN}`, children: [
        {name: VIEW_CHAT, path: `/:id/${VIEW_CHAT}`},
        {name: VIEW_USER, path: `/:id/${VIEW_USER}`}
    ]},
    {name: VIEW_LOADING, path: `/${VIEW_LOADING}/:title`}
]

export const defaultRoute = VIEW_MAIN