import React, {Component} from 'react'
import {isGIPHY} from '~/shared/utils'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextMessage from './components/TextMessage'
import GIFMessage from './components/GIFMessage'
import styled from 'styled-components'


const MessageWrapper = styled.div`
	margin-left: 92px;
	padding-right: 92px;
	padding-top: ${props => props.first ? '29' : '6'}px;
	padding-bottom: 7px;
	position: relative;
`;

const Timestamp = styled.span`
	color: ${props => props.first ? props.theme.palette.textColor : props.theme.palette.secondaryTextColor};
	font-size: 14px;
	position: absolute;
	top: ${props => props.first ? '11' : '6'}px;
	right: 20px;
`;

@muiThemeable()
class Message extends Component {
	render() {
		const {muiTheme, first, sentTime, formattedMessage} = this.props;
		const AppropriateWrapper = isGIPHY(formattedMessage) ? GIFMessage : TextMessage;
		return (
			<MessageWrapper theme={muiTheme} first={first}>
				<AppropriateWrapper formattedMessage={formattedMessage}/>
				<Timestamp theme={muiTheme} first={first}>
					{sentTime}
				</Timestamp>
			</MessageWrapper>
		)
	}
}

export default Message
// function Message({formattedMessage, sentTime, first, muiTheme}) {
// 	return (
// 		<MessageWrapper theme={muiTheme} first={first}>
// 			{isGIPHY(formattedMessage) ? <GIFMessage formattedMessage={formattedMessage}/> : <TextMessage formattedMessage={formattedMessage}/>}
// 			<Timestamp theme={muiTheme} first={first}>
// 				{sentTime}
// 			</Timestamp>
// 		</MessageWrapper>
// 	);
// }
//
// export default muiThemeable()(Message)