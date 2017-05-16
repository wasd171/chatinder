import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { VIEW_CHAT, VIEW_USER, VIEW_PROFILE } from 'shared/constants'
import ChatSection from './scenes/ChatSection'
import UserSection from './scenes/UserSection'
import ProfileSection from './scenes/ProfileSection'
import Stub from './scenes/Stub'

@inject('view')
@observer
class RoutedSection extends Component {
	render() {
		switch (this.props.view.pathNodes[1]) {
			case VIEW_CHAT:
				if (this.props.view.params.id !== undefined) {
					return <ChatSection />
				}
			case VIEW_USER:
				return <UserSection id={this.props.view.params.id} />
			case VIEW_PROFILE:
				return <ProfileSection />
			default:
				return <Stub />
		}
	}
}

export default RoutedSection
