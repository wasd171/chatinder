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

function renderApp({container, store, theme}) {
	console.log('renderApp called');
	Inferno.render(
		<Provider store={store}>
			<MuiThemeProvider muiTheme={theme}>
				<App/>
			</MuiThemeProvider>
		</Provider>,
		container
	);
}

async function configureAndRender() {
	const container = document.getElementById('root');
	const loader = document.getElementById('loading-screen');

	loader.style = loadingFullScreen;
	Inferno.render(
		<MuiThemeProvider muiTheme={theme}>
			<LoadingScreen title="App is loading" muiTheme={theme}/>
		</MuiThemeProvider>,
		loader
	);

	console.log('start configure');
	const store = await configureStores(Stores);
	console.log('end configure');
	useStrict(true);

	renderApp({container, store, theme});

	await Promise.delay(1000);

	if (module.hot) {
		module.hot.accept('./scenes/App', () => {
			const NewApp = require('./scenes/App');
			Inferno.render(
				<Provider store={store}>
					<MuiThemeProvider muiTheme={theme}>
						<NewApp/>
					</MuiThemeProvider>
				</Provider>,
				container
			);
		})
	}

	Inferno.render(null, loader);
}

configureAndRender();