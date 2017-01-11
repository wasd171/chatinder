import Inferno from 'inferno'
import {messageContainer} from './styles'
import {isGIPHY} from 'app/utils'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextMessage from './components/TextMessage'
import GIFMessage from './components/GIFMessage'


function Message({messageObj, first, muiTheme}) {
	const {message} = messageObj;

	return (
		<div style={messageContainer({muiTheme, first})}>
			{isGIPHY(message) ? <GIFMessage message={message}/> : <TextMessage message={message}/>}
		</div>
	);
}

export default muiThemeable()(Message)