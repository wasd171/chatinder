import Inferno from 'inferno'
import {observer} from 'inferno-mobx'
import {expr} from 'mobx'
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
)(MessagesGroup)