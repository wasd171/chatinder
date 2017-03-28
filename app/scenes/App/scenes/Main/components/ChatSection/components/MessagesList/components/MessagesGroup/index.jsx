import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {expr, computed} from 'mobx'
import Avatar from 'app/components/Avatar'
import Message from './components/Message'
import compose from 'recompose/compose'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {fade} from 'material-ui/utils/colorManipulator'
import styled from 'styled-components'


const OuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const AvatarWrapper = styled.div`
	position: absolute;
	left: 43px;
	top: 10px;
`;

const NameWrapper = styled.div`
	position: absolute;
	left: 92px;
	top: 11px;
	color: ${props => fade(props.theme.palette.primary1Color, 0.87)};
	font-weight: 500;
	font-size: 14px;
	line-height: 15.5px;
`;

@inject('store')
@muiThemeable()
@observer
class MessagesGroup extends Component {
	@computed get firstMessage() {
		return this.props.messagesGroup[0];
	}

	@computed get target() {
		const id = this.firstMessage.from;
		if (id === this.props.store.profile['_id']) {
			return this.props.store.profile;
		} else {
			return this.props.currentMatch.person;
		}
	}

	@computed get messages() {
		const [, ...tailMessages] = this.props.messagesGroup;
		return tailMessages.map(messageObj => <Message messageObj={messageObj} first={false} key={messageObj['_id']}/>);
	}

	render() {
		return (
			<OuterWrapper>
				<AvatarWrapper key='avatar'><Avatar src={this.target.smallPhoto} size={38}/></AvatarWrapper>
				<NameWrapper theme={this.props.muiTheme} key='name'>{this.target.name}</NameWrapper>
				<Message messageObj={this.firstMessage} first={true} key='firstMessage'/>
				{this.messages}
			</OuterWrapper>
		);
	}
}

export default MessagesGroup
/*function MessagesGroup({messagesGroup, store, currentMatch, muiTheme}) {
	const [messageObj, ...tailMessages] = messagesGroup;
	const messages = tailMessages.map(messageObj => <Message messageObj={messageObj} first={false}/>);

	const target = expr(() => {
		const id = messagesGroup[0].from;
		if (id === store.profile['_id']) {
			return store.profile;
		} else {
			return currentMatch.person;
		}
	});

	return (
		<OuterWrapper>
			<AvatarWrapper><Avatar src={target.smallPhoto} size={38}/></AvatarWrapper>
			<NameWrapper theme={muiTheme}>{target.name}</NameWrapper>
			<Message messageObj={messageObj} first={true}/>
			{messages}
		</OuterWrapper>
	);
}

// export default observer(['store'])(MessagesGroup)
export default compose(
	muiThemeable(),
	observer(['store'])
)(MessagesGroup)*/