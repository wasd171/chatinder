// @flow
import { AppManager } from './AppManager'
import { app, Menu } from 'electron'
import { enableLiveReload } from 'electron-compile'
import { updateApp, buildMenu } from './utils'

export function onBeforeQuitFactory(instance: AppManager) {
	return function onBeforeQuit() {
		instance.forceQuit = true
	}
}

export function onCloseFactory(instance: AppManager) {
	return function onClose(event: Event) {
		if (!instance.forceQuit) {
			event.preventDefault()
			instance._window.hide()
		}
	}
}

export function onActivateFactory(instance: AppManager) {
	return function onActivate() {
		instance._window.restore()
	}
}

export default function startFactory(instance: AppManager) {
	return async function start() {
		if (!app.isReady()) {
			await new Promise(resolve => app.on('ready', resolve))
		}

		if (process.env.NODE_ENV === 'development') {
			require('electron-debug')({ enabled: true })
			require('devtron').install()
			enableLiveReload()
			await instance.installExtensions()
		}

		instance.createWindow()
		buildMenu()

		if (
			process.env.NODE_ENV === 'development' &&
			instance._window !== undefined
		) {
			instance._window.webContents.openDevTools()
			instance._window.webContents.on('context-menu', (event, props) => {
				const { x, y } = props

				Menu.buildFromTemplate([
					{
						label: 'Inspect element',
						click() {
							if (instance._window !== undefined) {
								instance._window.webContents.inspectElement(
									x,
									y
								)
							}
						}
					}
				]).popup(instance._window)
			})
		}

		const { platform, env } = process
		const isWinOrMac = platform === 'win32' || platform === 'darwin'
		if (isWinOrMac && env.NODE_ENV !== 'development') {
			instance._window.webContents.once(
				'did-frame-finish-load',
				updateApp
			)
		}

		app.on('before-quit', onBeforeQuitFactory(instance))
		instance._window.on('close', onCloseFactory(instance))
		app.on('activate', onActivateFactory(instance))
	}
}
