import Inferno from 'inferno'
import {observer} from 'inferno-mobx'
import {expr} from 'mobx'
import {container, avatarWrapper, nameWrapper, messageWrapper, firstMessageWrapper} from './styles'
import Avatar from 'app/components/Avatar'
import Message from './components/Message'
import compose from 'recompose/compose'
import muiThemeable from 'material-ui/styles/muiThemeable'


function MessagesGroup({messagesGroup, store, currentMatch, muiTheme}) {
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
		<div style={container}>
			<div style={avatarWrapper}><Avatar src={target.smallPhoto} size={38}/></div>
			<div style={nameWrapper(muiTheme)}>{target.name}</div>
			<Message messageObj={messageObj} first={true}/>
			{messages}
		</div>
	);
}

// export default observer(['store'])(MessagesGroup)
export default compose(
	muiThemeable(),
	observer(['store'])
)(MessagesGroup)