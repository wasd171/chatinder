import React from 'react'
import ReactDOM from 'react-dom'

import {AppContainer} from 'react-hot-loader'
import {ApolloProvider} from 'react-apollo'
import {Provider} from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {useStrict} from 'mobx'
import TapPlugin from 'react-tap-event-plugin'
TapPlugin();

import configureTheme from './configureTheme'
import configureClient from './configureClient'
import {configureStores} from './stores'

const container = document.getElementById('root');

function renderApp({node, children}) {
	console.log('renderApp called');
	ReactDOM.render(
		<MuiThemeProvider muiTheme={theme}>
			<ApolloProvider client={client}>
				{children}
			</ApolloProvider>
		</MuiThemeProvider>,
		node
	);
}

async function configureAndRender() {
	const container = document.getElementById('root');

	console.log('start configure');
	const theme = configureTheme();
	const client = configureClient();
	const stores = await configureStores(client);
	console.log({theme, client, stores});
	console.log('end configure');
	useStrict(true);

	function render() {
		const App = require('./scenes/App/index').default;
		ReactDOM.render(
			<AppContainer>
				<MuiThemeProvider muiTheme={theme}>
					<ApolloProvider client={client}>
						<Provider {...stores}>
							<App/>
						</Provider>
					</ApolloProvider>
				</MuiThemeProvider>
			</AppContainer>,
			container
		)
	}

	render();
	if (module.hot) {
		module.hot.accept(render);
	}
}

configureAndRender();