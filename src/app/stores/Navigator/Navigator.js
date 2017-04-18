import {configureRouter} from './configureRouter'
import {VIEW_AUTH, VIEW_MAIN, VIEW_CHAT, VIEW_USER, VIEW_LOADING} from '~/app/constants'
import mutation from './showWindow'


export class Navigator {
    router;

    start = async ({view, client, currentView}) => {
        this.router = await configureRouter({view, client});
        await client.mutate({mutation});
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

    goToChat({id, index}) {
        this.router.navigate(`${VIEW_MAIN}.${VIEW_CHAT}`, {id, index});
    }

    goToUser({id}) {
        this.router.navigate(`${VIEW_MAIN}.${VIEW_USER}`, {id});
    }
}