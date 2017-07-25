import * as React from 'react'
import Message from './components/Message'
import FirstMessage from './components/FirstMessage'
import NewDayMessage from './components/NewDayMessage'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { AbstractAPI, MessageType, PersonType } from '~/shared/definitions'

const GenericMessageContainer = styled.div`overflow-anchor: auto;`

interface IGenericMessageProps {
	style: {}
	matchId: string
	message: MessageType
	user: PersonType
	me: boolean
}

interface IInjectedProps extends IGenericMessageProps {
	api: AbstractAPI
}

@inject('api')
@observer
class GenericMessage extends React.Component<IGenericMessageProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	handleClick = () => {
		this.injected.api.resendMessage(this.props.message._id)
	}

	renderContent = () => {
		const { message, user, me, matchId } = this.props

		if (message.first) {
			if (message.firstInNewDay) {
				return (
					<NewDayMessage message={message}>
						<FirstMessage user={user} me={me} matchId={matchId}>
							<Message
								message={message}
								resend={this.handleClick}
							/>
						</FirstMessage>
					</NewDayMessage>
				)
			} else {
				return (
					<FirstMessage user={user} me={me} matchId={matchId}>
						<Message message={message} resend={this.handleClick} />
					</FirstMessage>
				)
			}
		} else {
			return <Message message={message} resend={this.handleClick} />
		}
	}

	render() {
		return (
			<GenericMessageContainer style={this.props.style}>
				{this.renderContent()}
			</GenericMessageContainer>
		)
	}
}

export default GenericMessage
