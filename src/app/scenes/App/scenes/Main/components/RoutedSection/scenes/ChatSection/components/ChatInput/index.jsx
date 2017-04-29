import React, {Component} from 'react'
import {observable, action, computed} from 'mobx'
import TextField from './components/TextField'
import SendButton from './components/SendButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import transitions from 'material-ui/styles/transitions'
import {inject, observer} from 'mobx-react'
import styled from 'styled-components'
import trim from 'lodash/trim'
import {graphql} from 'react-apollo'
import sendMessageInfo from './query.graphql'
import sendMessageMutation from './mutation.graphql'
import {normalizeMessagePair} from '~/shared/utils'
import {PENDING, PSEUDO} from '~/shared/constants'
import uuid from 'uuid'
import {Message} from '~/main/ServerAPI/schema/resolvers/instances'


const padding = 10;

const OuterWrapper = styled.div`
	border-top: 1px solid ${props => props.theme.palette.borderColor};
	padding-left: ${padding}px;
	padding-right: ${padding}px;
	transition: ${transitions.easeOut('200ms', 'height')};
	display: inline-block;
	max-width: 100%;
	width: 100%;
	posititon: relative;
`;

const MiddleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
	max-width: 100%;
	width: 100%;
`;

const mutationOptions = {
	props: ({ownProps, mutate}) => ({
		submit: ({message, messageId}) => {
			const input = {
				_id: messageId,
				from: ownProps.data.profile.user._id,
				sent_date: new Date().toISOString(),
				message,
				status: PENDING
			}

			let optimisticMessage;
			const lastMessage = ownProps.data.match.lastMessage;
			if (lastMessage.status === PSEUDO) {
				optimisticMessage = normalizeMessagePair(input);
			} else {
				optimisticMessage = normalizeMessagePair(input, lastMessage);
			}
			optimisticMessage.sentDate = Message.sentDate(optimisticMessage);

			return mutate({
				variables: {
					id: ownProps.id,
					rawMessage: input
				},
				optimisticResponse: {
					__typename: 'Mutation',
					sendMessage: {
						__typename: 'Message',
						...optimisticMessage
					}
				},
				update: (proxy, {data}) => {
					const cacheData = proxy.readQuery({
						query: sendMessageInfo, 
						variables: {id: ownProps.id}
					});

					cacheData.match.lastMessage = data.sendMessage;
					cacheData.match.messages.push(data.sendMessage);
					cacheData.match.lastActivityDate = data.sendMessage.sentDate;

					proxy.writeQuery({
						query: sendMessageInfo, 
						data: cacheData, 
						variables: {id: ownProps.id}
					});
				}
			})
		}
	})
}

@inject(({view}) => ({id: view.params.id}))
@muiThemeable()
@graphql(sendMessageInfo)
@graphql(sendMessageMutation, mutationOptions)
@observer
class ChatInput extends Component {
	@observable value  = '';

	@computed get hasValue() {
		return !!this.isValid(this.value)
	}

	get disabled() {
		return (this.props.data.loading || !this.hasValue)
	}

	@action handleChange = (text) => {
		this.value = text;
	};

	@action handleSubmit = () => {
		console.log('Submit handler');
		if (!this.disabled) {
			const message = trim(this.value);
			this.props.submit({
				message,
				messageId: uuid.v1()
			});
			// this.props.mutate({
			// 	variables: {id, message}
			// });
			// const {view, tinder, api} = this.props.store;
			// const currentMatch = tinder.matches.get(view.currentView.params.matchId);
			// api.sendMessage(currentMatch['_id'], trim(this.value));
			this.value = '';
		}
	};

	isValid(value) {
		const normValue = trim(value);
		return normValue !== '' && normValue !== undefined && normValue !== null;
	}


	render() {
		return (
			<OuterWrapper height={this.height} theme={this.props.muiTheme}>
				<MiddleWrapper>
					<TextField
						fullWidth={true}
						value={this.value}
						hintText='Message'
						rows={this.rows}
						maxRows={this.maxRows}
						multiLine={true}
						onChange={this.handleChange}
						hasValue={this.hasValue}
						onSubmit={this.handleSubmit}
					/>
					<SendButton disabled={this.disabled} onClick={this.handleSubmit}/>
				</MiddleWrapper>
			</OuterWrapper>
		);
	}
}

export default ChatInput