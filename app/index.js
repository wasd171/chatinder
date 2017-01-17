// require('mobx-logger').enableLogging();
import {useStrict} from 'mobx'
import Promise from 'bluebird'

import Inferno from 'inferno'
import {Provider} from 'inferno-mobx'
if (process.env.NODE_ENV === 'development') {
	require('inferno-devtools');
}

import * as Stores from './stores'
import configureStores from './configureStores'

import '!style!css!react-virtualized/styles.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './configureTheme'
window.muiTheme = theme;
import App from './scenes/App'
import {LoadingScreen} from './scenes/App/scenes/LoadingScreen'
import {loadingFullScreen} from './styles'
import emojione from 'emojione'
import 'inline?parentId=svg-sprite!emojione/assets/sprites/emojione.sprites.svg'
emojione.imageType = 'svg';
emojione.sprites = true;
emojione.imagePathSVGSprites = '';

function renderApp({node, children}) {
	console.log('renderApp called');
	Inferno.render(
		<MuiThemeProvider muiTheme={theme}>
			{children}
		</MuiThemeProvider>,
		node
	);
}

async function configureAndRender() {
	const container = document.getElementById('root');
	const loader = document.getElementById('loading-screen');

	loader.style = loadingFullScreen;
	renderApp({
		node: loader, 
		children: <LoadingScreen title="App is loading" muiTheme={theme}/>
	})

	console.log('start configure');
	const store = await configureStores(Stores);
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

	Inferno.render(null, loader);
}

configureAndRender();