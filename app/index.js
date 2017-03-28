// require('mobx-logger').enableLogging();
import {useStrict} from 'mobx'
import Promise from 'bluebird'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'
// require('inferno-devtools');
// import Inferno from 'inferno'
// import {Provider} from 'mobx-react'
//if (process.env.NODE_ENV === 'development') {
	
//}

import * as Stores from './stores'
import configureStores from './configureStores'
import {configureStores as configureStores2} from './stores_v2'

import 'react-virtualized/styles.css'
import 'simplebar/dist/simplebar.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TapPlugin from 'react-tap-event-plugin'
TapPlugin();
import theme from './configureTheme'
window.muiTheme = theme;
import App from './scenes/App'
import {LoadingScreen} from './scenes/App/scenes/LoadingScreen'
import {loadingFullScreen} from './styles'
// import '!style-loader!css-loader!emojione/assets/sprites/emojione.sprites.css'
import 'emojionearea/dist/emojionearea.min.css'
import './app.global.css'
// import 'inline?parentId=svg-sprite!emojione/assets/sprites/emojione.sprites.svg'

// import 'inferno-devtools'

function renderApp({node, children}) {
	console.log('renderApp called');
	ReactDOM.render(
		<MuiThemeProvider muiTheme={theme}>
			{children}
		</MuiThemeProvider>,
		node
	);
}

async function configureAndRender() {
	const container = document.getElementById('root');
	const loader = document.getElementById('loading-screen');

	// Workaround for devtools
	// if (process.env.NODE_ENV === 'development') {
	// 	renderApp({
	// 		node: container, 
	// 		children: <div>Hello</div>
	// 	});
	// }

	loader.style = loadingFullScreen;
	// renderApp({
	// 	node: loader, 
	// 	children: (
	// 		<LoadingScreen title="App is loading" muiTheme={theme}/>
	// 	)
	// })

	console.log('start configure');
	const store = await configureStores(Stores);
	// const stores = await configureStores2();
	console.log('end configure');
	useStrict(true);

	renderApp({
		node: container, 
		children: (
			<Provider store={store}>
				<App/>
			</Provider>	
		)
	});

	await Promise.delay(1000);

	if (module.hot) {
		module.hot.accept('./scenes/App', () => {
			const NewApp = require('./scenes/App');
			renderApp({
				node: container,
				children: (
					<Provider store={store}>
						<NewApp/>
					</Provider>
				)
			});
		})
	}

	// Inferno.render(<span></span>, loader);
}

configureAndRender();