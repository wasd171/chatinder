// @flow
import {AppManager} from './AppManager'
import Promise from 'bluebird'


export default function logoutFactory(instance: AppManager) {
    return async function logout() {
        if (instance._window !== undefined) {
            const {session} = instance._window.webContents;
            await Promise.fromCallback(callback => session.clearCache(callback));
            await Promise.fromCallback(callback => session.clearStorageData({}, callback));
        } else {
            throw new Error('Window was undefined when trying to log out');
        }
    }
}