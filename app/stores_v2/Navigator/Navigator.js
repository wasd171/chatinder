import {configureRouter} from './configureRouter'
import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING} from 'app/constants'


export class Navigator {
    router;

    constructor({view, api, server, currentView}) {
        this.router = configureRouter({view, api, server});
        this.router.start(currentView);
    }

    goToAuth() {
        this.router.navigate(VIEW_AUTH);
    }

    goToLoading(title) {
        this.router.navigate(VIEW_LOADING, {title});
    }

    goToMain() {
        this.router.navigate(VIEW_MAIN);
    }

    goToChat(id) {
        this.router.navigate(`${VIEW_MAIN}.${VIEW_CHAT}`, {id});
    }

    goToUser(id) {
        this.router.navigate(`${VIEW_MAIN}.${VIEW_USER}`, {id});
    }
}