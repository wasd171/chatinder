import React from 'react'
import ChatHeader from './components/ChatHeader'
import MessagesList from './components/MessagesList'
import ChatInput from './components/ChatInput'


function ChatSection({show, MainSection, HeaderContainer, theme}) {
	const children = show
		?
			[
				<HeaderContainer key='header'>
					<ChatHeader/>
				</HeaderContainer>,
				<MessagesList key='messages'/>,
				<ChatInput key='chat'/>
			]
		:
			`Select your match`
		;

	return (
		<MainSection theme={theme}>{children}</MainSection>
	)
}

export default ChatSection