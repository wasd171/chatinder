import {app} from 'electron'
if (require('electron-squirrel-startup')) {
    app.quit();
}

import {ServerAPI} from './main/ServerAPI'

const api = new ServerAPI();
api.start();