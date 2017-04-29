// @flow
import {AppManager} from './AppManager'
import {app, Menu} from 'electron'
import Promise from 'bluebird'
import {enableLiveReload} from 'electron-compile'


export function onClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

export function onActivateFactory(instance: AppManager) {
    return function onActivate() {
        if (instance._window === null) {
            instance.createWindow();
            instance.reload();
        }
    }
}

export default function startFactory(instance: AppManager) {
    return async function start() {
        if (!app.isReady()) {
            await new Promise(resolve => app.on('ready', resolve));
        }

        if (process.env.NODE_ENV !== 'production') {
            require('electron-debug')({enabled: true});
            require('devtron').install();
            // enableLiveReload({strategy: 'react-hmr'});
            await instance.installExtensions();
        }

        instance.createWindow();

        if (process.env.NODE_ENV !== 'production' && instance._window !== undefined) {
            instance._window.webContents.openDevTools();
            instance._window.webContents.on('context-menu', (event, props) => {
                const {x, y} = props;

                Menu.buildFromTemplate([{
                    label: 'Inspect element',
                    click() {
                        if (instance._window !== undefined) {
                            instance._window.webContents.inspectElement(x, y);
                        }
                    }
                }]).popup(instance._window)
            })
        }

        app.on('window-all-closed', onClosed);
        app.on('activate', onActivateFactory(instance));
    }
}