// @flow
import {AppManager} from './AppManager'
import {app, Menu} from 'electron'
import Promise from 'bluebird'
import {enableLiveReload} from 'electron-compile'
import {updateApp} from './utils'


export function onClosedFactory(instance: AppManager) {
    return function onClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        } else {
            instance._window = null;
        }
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

        if (process.env.NODE_ENV === 'development') {
            require('electron-debug')({enabled: true});
            require('devtron').install();
            enableLiveReload();
            await instance.installExtensions();
        }

        instance.createWindow();

        if (process.env.NODE_ENV === 'development' && instance._window !== undefined) {
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
            });
        }

        const isWin = (process.platform === 'win32');
        if (isWin && process.env.NODE_ENV !== 'development') {
            instance._window.webContents.once('did-frame-finish-load', () => {
                updateApp();
            });
        }

        app.on('window-all-closed', onClosedFactory(instance));
        app.on('activate', onActivateFactory(instance));
    }
}