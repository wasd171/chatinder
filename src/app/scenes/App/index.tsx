import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { inject } from 'mobx-react'
import {
	VIEW_AUTH,
	VIEW_MATCHES,
	VIEW_LOADING,
	routes
} from '~/shared/constants'
import Auth from './scenes/Auth'
import Main from './scenes/Main'
import LoadingScreen from './scenes/LoadingScreen'
import { Navigator } from '~/app/stores/Navigator'
import { History as CustomHistory } from 'history'

export interface IAppProps {
	history: CustomHistory
}

export interface IInjectedProps extends IAppProps {
	navigator: Navigator
}

@inject('navigator')
class App extends React.Component<IAppProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	componentDidMount() {
		this.injected.navigator.setHistory(this.props.history)
	}

	render() {
		return (
			<Switch>
				<Route path={routes[VIEW_AUTH]} component={Auth} />
				<Route path={routes[VIEW_LOADING]} component={LoadingScreen} />
				<Route path={routes[VIEW_MATCHES]} component={Main} />
			</Switch>
		)
	}
}

export default App
