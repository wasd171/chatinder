import Inferno from 'inferno'
import {isGIPHY} from 'app/utils'
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


function Message({messageObj, first, muiTheme}) {
	const {message} = messageObj;

	return (
		<MessageWrapper theme={muiTheme} first={first}>
			{isGIPHY(message) ? <GIFMessage message={message}/> : <TextMessage message={message}/>}
			<Timestamp theme={muiTheme} first={first}>
				{messageObj.sentTime}
			</Timestamp>
		</MessageWrapper>
	);
}

export default muiThemeable()(Message)