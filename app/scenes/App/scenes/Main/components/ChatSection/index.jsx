import Inferno from 'inferno'
import ChatHeader from './components/ChatHeader'
import MessagesList from './components/MessagesList'
import ChatInput from './components/ChatInput'


function ChatSection({show, MainSection, HeaderContainer, theme}) {
	const children = show
		?
			[
				<HeaderContainer>
					<ChatHeader/>
				</HeaderContainer>,
				<MessagesList/>,
				<ChatInput/>
			]
		:
			`Select your match`
		;

	return (
		<MainSection theme={theme}>{children}</MainSection>
	)
}

export default ChatSection