import React, { Component } from 'react'
import {
	VIEW_CHAT,
	VIEW_USER,
	VIEW_PROFILE,
	VIEW_MATCHES,
	routes
} from 'shared/constants'
import ChatSection from './scenes/ChatSection'
import UserSection from './scenes/UserSection'
import ProfileSection from './scenes/ProfileSection'
import Stub from './scenes/Stub'
import { Switch, Route } from 'react-router-dom'

class RoutedSection extends Component {
	renderUser({ match }) {
		return <UserSection id={match.params.id} />
	}

	render() {
		return (
			<Switch>
				<Route exact path={routes[VIEW_MATCHES]} component={Stub} />
				<Route path={routes[VIEW_CHAT]} component={ChatSection} />
				<Route path={routes[VIEW_USER]} render={this.renderUser} />
				<Route path={routes[VIEW_PROFILE]} component={ProfileSection} />
				<Route path="*" component={Stub} />
			</Switch>
		)
		// switch (this.props.view.pathNodes[1]) {
		// 	case VIEW_CHAT:
		// 		if (this.props.view.params.id !== undefined) {
		// 			return <ChatSection />
		// 		}
		// 	case VIEW_USER:
		// 		return <UserSection id={this.props.view.params.id} />
		// 	case VIEW_PROFILE:
		// 		return <ProfileSection />
		// 	default:
		// 		return <Stub />
		// }
	}
}

export default RoutedSection
