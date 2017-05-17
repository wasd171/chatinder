import React, { Component } from 'react'
import Message from './components/Message'
import FirstMessage from './components/FirstMessage'
import NewDayMessage from './components/NewDayMessage'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import resendMessageMutation from './mutation.graphql'
import statusFragment from './fragment.graphql'
import { PENDING } from 'shared/constants'

const GenericMessageContainer = styled.div`
    overflow-anchor: auto;
`

const mutationOptions = {
	props: ({ mutate }) => ({
		resend: ({ id, messageId }) => {
			return mutate({
				variables: {
					id,
					messageId
				},
				optimisticResponse: {
					__typename: 'Mutation',
					resendMessage: {
						__typename: 'Message',
						_id: messageId,
						status: PENDING
					}
				},
				update: (proxy, { data }) => {
					proxy.writeFragment({
						id: messageId,
						fragment: statusFragment,
						data: {
							status: data.resendMessage.status,
							__typename: data.resendMessage.__typename
						}
					})
				}
			})
		}
	})
}

@graphql(resendMessageMutation, mutationOptions)
class GenericMessage extends Component {
	handleClick = () => {
		this.props.resend({
			id: this.props.matchId,
			messageId: this.props.message._id
		})
	}

	renderContent = () => {
		const { message, user, me, matchId } = this.props

		if (message.first) {
			if (message.firstInNewDay) {
				return (
					<NewDayMessage message={message}>
						<FirstMessage user={user} me={me} matchId={matchId}>
							<Message {...message} resend={this.handleClick} />
						</FirstMessage>
					</NewDayMessage>
				)
			} else {
				return (
					<FirstMessage user={user} me={me} matchId={matchId}>
						<Message {...message} resend={this.handleClick} />
					</FirstMessage>
				)
			}
		} else {
			return <Message {...message} resend={this.handleClick} />
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
