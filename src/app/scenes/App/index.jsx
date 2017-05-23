import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { VIEW_AUTH, VIEW_MATCHES, VIEW_LOADING, routes } from 'shared/constants'
import Auth from './scenes/Auth'
import Main from './scenes/Main'
import LoadingScreen from './scenes/LoadingScreen'

class App extends Component {
	render() {
		return (
			<Router hashType="slash">
				<Switch>
					<Route path={routes[VIEW_AUTH]} component={Auth} />
					<Route
						path={routes[VIEW_LOADING]}
						component={LoadingScreen}
					/>
					<Route path={routes[VIEW_MATCHES]} component={Main} />
				</Switch>
			</Router>
		)
	}
}

export default App
