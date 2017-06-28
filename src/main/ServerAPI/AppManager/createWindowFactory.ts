import { AbstractAppManager } from 'shared/definitions'
import { BrowserWindow } from 'electron'
import { resolveRoot } from 'shared/utils'

export default function createWindowFactory(instance: AbstractAppManager) {
	return function createWindow() {
		instance._window = new BrowserWindow({
			show: false,
			width: 1024,
			height: 728,
			minWidth: 660,
			minHeight: 340,
			webPreferences: {
				nodeIntegration: true,
				blinkFeatures:
					'CSSScrollSnapPoints,CSSSnapSize,ScrollAnchoring,CSSOMSmoothScroll',
				experimentalFeatures: true
			},
			icon: `${resolveRoot()}/icons/icon.png`
		})
	}
}
