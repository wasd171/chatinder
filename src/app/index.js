import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { Provider } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { HashRouter as Router, Route } from 'react-router-dom'

import { useStrict } from 'mobx'
import TapPlugin from 'react-tap-event-plugin'
TapPlugin()

import configureTheme from './configureTheme'
import configureClient from './configureClient'
import { configureStores } from './stores'

async function configureAndRender() {
	const container = document.getElementById('root')

	const theme = configureTheme()
	const client = configureClient()
	const stores = await configureStores(client)
	useStrict(true)

	function render() {
		const App = require('./scenes/App/index').default
		ReactDOM.render(
			<MuiThemeProvider muiTheme={theme}>
				<ApolloProvider client={client}>
					<Provider {...stores}>
						<Router hashType="slash">
							<Route path="/" component={App} />
						</Router>
					</Provider>
				</ApolloProvider>
			</MuiThemeProvider>,
			container
		)
	}

	render()
	if (module.hot) {
		module.hot.accept(render)
	}
}

configureAndRender()
