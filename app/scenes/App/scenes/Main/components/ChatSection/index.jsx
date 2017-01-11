import Inferno from 'inferno'
import ChatHeader from './components/ChatHeader'
import MessagesList from './components/MessagesList'
import ChatInput from './components/ChatInput'


function ChatSection({show, MainSection, HeaderContainer}) {
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
		<MainSection>{children}</MainSection>
	)
}

export default ChatSection