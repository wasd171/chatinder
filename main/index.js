import {app, BrowserWindow, ipcMain} from 'electron';
import configureTemplate from './configureTemplate'
import getToken from './getToken'
import getId from './getId'
import tinderApi from './tinderApi'
import {FB_GET_TOKEN_REQUEST, FB_GET_ID_REQUEST, TINDER_API} from '../app/constants'

let mainWindow = null;


// if (process.env.NODE_ENV === 'development') {
// 	require('electron-debug')(); // eslint-disable-line global-require
// }

// For production tests!!
require('electron-debug')();


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
	if (process.env.NODE_ENV === 'development') {
		const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

		const extensions = [
			installer.REACT_DEVELOPER_TOOLS
		];
		const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
		for (const name of extensions) {
			try {
				await installer.default(installer[name], forceDownload);
			} catch (e) {} // eslint-disable-line
		}
	}
};

app.on('ready', async () => {
	await installExtensions();

	mainWindow = new BrowserWindow({
		show:   false,
		width:  1024,
		height: 728,
		minWidth: 660,
		minHeight: 340
	});

	ipcMain.on(FB_GET_TOKEN_REQUEST, getToken);
	ipcMain.on(FB_GET_ID_REQUEST, getId);
	ipcMain.on(TINDER_API, tinderApi.handleRequest);

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL(`file://${__dirname}/../app/index.html`);
	} else {
		mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	}

	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	configureTemplate(mainWindow);
});
