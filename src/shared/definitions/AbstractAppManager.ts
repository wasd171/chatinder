export abstract class AbstractAppManager {
	_window: Electron.BrowserWindow | null
	forceQuit: boolean
	abstract get window(): Electron.BrowserWindow | null

	abstract start: () => Promise<void>
	abstract reload: () => void
	abstract createWindow: () => void
	abstract show: () => void
	abstract logout: () => Promise<void>
	abstract installExtensions: () => Promise<void>
}
