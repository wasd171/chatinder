import React, { Component } from 'react'
import MainSection from 'app/components/MainSection'
import HeaderContainer from 'app/components/HeaderContainer'
import ChatHeader from './components/ChatHeader'
import MessagesFeed from './components/MessagesFeed'
import ChatInput from './components/ChatInput'
import { Route } from 'react-router-dom'
import { VIEW_CHAT, routes } from 'shared/constants'

class ChatSection extends Component {
	renderHeader({ match }) {
		return <ChatHeader id={match.params.id} />
	}

	renderMessages({ match }) {
		return <MessagesFeed id={match.params.id} />
	}

	renderInput({ match }) {
		return <ChatInput id={match.params.id} />
	}

	render() {
		return (
			<MainSection>
				<HeaderContainer>
					<Route
						path={routes[VIEW_CHAT]}
						render={this.renderHeader}
					/>
				</HeaderContainer>
				<Route path={routes[VIEW_CHAT]} render={this.renderMessages} />
				<Route path={routes[VIEW_CHAT]} render={this.renderInput} />
			</MainSection>
		)
	}
}

export default ChatSection
