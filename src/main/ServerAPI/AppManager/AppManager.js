// @flow
import startFactory from './startFactory'
import reloadFactory from './reloadFactory'
import createWindowFactory from './createWindowFactory'
import showFactory from './showFactory'
import logoutFactory from './logoutFactory'
import installExtensions from './installExtensions'


type windowType = Electron.BrowserWindow | undefined;

export class AppManager {
    _window: windowType;

    get window(): windowType {
        return this._window;
    }

    start = startFactory(this);
    reload = reloadFactory(this);
    createWindow = createWindowFactory(this);
    show = showFactory(this);
    logout = logoutFactory(this);
    installExtensions = installExtensions;
}