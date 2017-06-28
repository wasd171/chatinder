import { AbstractAppManager } from 'shared/definitions'
import { app, Menu } from 'electron'
import { enableLiveReload } from 'electron-compile'
import { updateApp, buildMenu } from './utils'

export function onBeforeQuitFactory(instance: AbstractAppManager) {
	return function onBeforeQuit() {
		instance.forceQuit = true
	}
}

export function onCloseFactory(instance: AbstractAppManager) {
	return function onClose(event: Event) {
		if (!instance.forceQuit) {
			event.preventDefault()
			if (instance.window != null) {
				instance.window.hide()
			}
		}
	}
}

export function onActivateFactory(instance: AbstractAppManager) {
	return function onActivate() {
		if (instance.window != null) {
			instance.window.restore()
		}
	}
}

export default function startFactory(instance: AbstractAppManager) {
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
			instance.window !== null
		) {
			instance.window.webContents.openDevTools()
			instance.window.webContents.on('context-menu', (_event, props) => {
				const { x, y } = props

				if (instance.window != null) {
					Menu.buildFromTemplate([
						{
							label: 'Inspect element',
							click() {
								if (instance.window !== null) {
									instance.window.webContents.inspectElement(
										x,
										y
									)
								}
							}
						}
					]).popup(instance.window)
				}
			})
		}

		const { platform, env } = process
		const isWinOrMac = platform === 'win32' || platform === 'darwin'
		if (
			isWinOrMac &&
			env.NODE_ENV !== 'development' &&
			instance.window !== null
		) {
			instance.window.webContents.once('did-frame-finish-load', () => {
				updateApp(instance)
			})
		}

		app.on('before-quit', onBeforeQuitFactory(instance))
		if (instance.window != null) {
			instance.window.on('close', onCloseFactory(instance))
		}
		app.on('activate', onActivateFactory(instance))
	}
}
