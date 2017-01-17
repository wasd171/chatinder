import Inferno from 'inferno'
import Component from 'inferno-component'
import {observer, inject} from 'inferno-mobx'
import {expr, computed} from 'mobx'

import {VIEW_AUTH, VIEW_MAIN, VIEW_LOADING} from 'app/constants'
import Auth from './scenes/Auth'
import Main from './scenes/Main'
import LoadingScreen from './scenes/LoadingScreen'


class App extends Component {
	@computed get name() {
		return this.props.store.currentView.name;
	}

	render() {
		console.log('App render', this.name);
		switch (this.name) {
			case VIEW_AUTH:
				return <Auth/>;
			case VIEW_MAIN:
				return <Main/>;
			case VIEW_LOADING:
				return <LoadingScreen/>
		}
	}
}


export default observer(['store'])(App)