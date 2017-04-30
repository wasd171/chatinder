import React, {Component} from 'react'
import MainSection from 'app/components/MainSection'
import HeaderContainer from 'app/components/HeaderContainer'
import ChatHeader from './components/ChatHeader'
import MessagesFeed from './components/MessagesFeed'
import ChatInput from './components/ChatInput'


class ChatSection extends Component {
	render() {
		return (
			<MainSection>
				<HeaderContainer>
					<ChatHeader/>
				</HeaderContainer>
				<MessagesFeed/>
				<ChatInput/>
			</MainSection>
		)
	}
}

export default ChatSection