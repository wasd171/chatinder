import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {computed, toJS} from 'mobx'

import {VIEW_AUTH, VIEW_MAIN, VIEW_LOADING} from 'shared/constants'
import Auth from './scenes/Auth'
import Main from './scenes/Main'
import LoadingScreen from './scenes/LoadingScreen'

@inject('view')
@observer
class App extends Component {
	render() {
		switch (this.props.view.pathNodes[0]) {
			case VIEW_AUTH:
				return <Auth/>;
			case VIEW_LOADING:
				return <LoadingScreen/>;
			case VIEW_MAIN:
				return <Main/>;
			default:
				throw new Error(`Unknown routing node: ${this.props.view.pathNodes[0]}`);
		}
	}
}


export default App