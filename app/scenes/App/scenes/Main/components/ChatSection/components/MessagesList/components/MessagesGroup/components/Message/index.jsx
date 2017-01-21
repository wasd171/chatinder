import Inferno from 'inferno'
import {isGIPHY} from 'app/utils'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextMessage from './components/TextMessage'
import GIFMessage from './components/GIFMessage'
import styled from 'styled-components'


const MessageWrapper = styled.div`
	margin-left: 92px;
	margin-right: 43px;
	padding-top: 6px;
	padding-bottom: 7px;
	${props => props.first && `padding-top: 29px;`}
`;


function Message({messageObj, first, muiTheme}) {
	const {message} = messageObj;

	return (
		<MessageWrapper theme={muiTheme} first={first}>
			{isGIPHY(message) ? <GIFMessage message={message}/> : <TextMessage message={message}/>}
		</MessageWrapper>
	);
}

export default muiThemeable()(Message)