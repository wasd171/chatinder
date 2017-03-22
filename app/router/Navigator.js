import {configureRouter} from './configureRouter'
import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING} from '../constants'


export class Navigator {
    router;

    constructor({store, initial}) {
        this.router = configureRouter({store});
        this.router.start(initial);
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