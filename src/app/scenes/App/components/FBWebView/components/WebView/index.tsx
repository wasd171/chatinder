import * as React from 'react'
import linkref, { ILinkedRefs } from '~/app/shims/linkref'
import { URL } from 'url'

export type Handler = (url: string) => void
type FormType = HTMLFormElement | undefined
type ActionType = string | null

interface WebViewProps {
	url: string
	userAgent: string
	onNavigate: Handler
	onFail: () => any
}

class WebView extends React.Component<WebViewProps> {
	_linkedRefs: ILinkedRefs
	private container: HTMLElement
	private webview: Electron.WebviewTag

	private runJS = (script: string) =>
		new Promise(resolve => {
			this.webview.executeJavaScript(script, true, resolve)
		})

	private handleLoad = async (_event: Electron.Event) => {
		const script = `document.getElementById('platformDialogForm')`
		const form = (await this.runJS(script)) as FormType
		if (form !== undefined) {
			let action: ActionType
			action = (await this.runJS(`${script}.action`)) as string

			try {
				const url = new URL(action)
				action = `${url.origin}${url.pathname}`
			} catch (err) {
				action = null
			}

			if (action === 'https://m.facebook.com/v2.6/dialog/oauth/confirm') {
				await this.runJS(`${script}.submit()`)
			} else {
				this.props.onFail()
			}
		}
	}

	private handleNavigation = (event: Electron.WillNavigateEvent) => {
		this.props.onNavigate(event.url)
	}

	private handleFail = (_event: Electron.DidFailLoadEvent) => {
		this.props.onFail()
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		const { url, userAgent } = this.props
		const webview = document.createElement('webview')

		webview.addEventListener('did-finish-load', this.handleLoad)
		webview.addEventListener('will-navigate', this.handleNavigation)
		webview.addEventListener('did-fail-load', this.handleFail)

		webview.setAttribute('style', 'width: 640px; height: 640px;')
		webview.setAttribute('src', url)
		webview.setAttribute('useragent', userAgent)

		this.webview = webview
		this.container.appendChild(webview)
	}

	componentWillUnmount() {
		this.webview.removeEventListener('will-navigate', this.handleNavigation)
		this.webview.removeEventListener('did-fail-load', this.handleFail)
	}

	render(): JSX.Element {
		return <div ref={linkref(this, 'container')} />
	}
}

export default WebView
