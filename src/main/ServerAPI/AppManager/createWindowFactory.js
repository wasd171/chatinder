// @flow
import { AppManager } from './AppManager'
import { BrowserWindow } from 'electron'

export default function createWindowFactory(instance: AppManager) {
	return function createWindow() {
		instance._window = new BrowserWindow({
			show: false,
			width: 1024,
			height: 728,
			minWidth: 660,
			minHeight: 340,
			webPreferences: {
				nodeIntegration: true,
				blinkFeatures: 'CSSScrollSnapPoints,CSSSnapSize,ScrollAnchoring,CSSOMSmoothScroll',
				experimentalFeatures: true
			},
			icon: require.resolve('@root/icons/icon.png')
		})
	}
}
