// @flow
import {AppManager} from './AppManager'


export default function reloadFactory(instance: AppManager) {
    return function reload() {
        const url = `file://${__dirname}/../../../index.html`
        if (instance._window) {
            instance._window.loadURL(url);
        }
    }
}