// @flow
import {AppManager} from './AppManager'


export default function showFactory(instance: AppManager) {
    return function show() {
        if (instance._window !== undefined) {
            instance._window.show();
            instance._window.focus();
        }
    }
}