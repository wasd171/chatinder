import Inferno from 'inferno'
import {observer} from 'inferno-mobx'
import {expr} from 'mobx'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import LinearProgress from 'material-ui/LinearProgress'
import compose from 'recompose/compose'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'


export const loader = {
	height: '4px',
	width: '100%'
};

const OuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const NameSpan = styled.span`
	color: ${props => props.theme.palette.textColor};
`;

const LastSeenContainer = styled.div`
	color: ${props => props.theme.palette.secondaryTextColor};
	font-size: 14px;
`;

const LoaderContainer = styled.div`
	height: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 68px;
	position: relative;
	overflow: hidden;
`;

function ChatHeader({store, muiTheme}) {
	const currentMatch = store.matches.get(store.currentView.params.matchId);
	const name = expr(() => currentMatch.person.name);
	const pingTime = currentMatch.person.pingTime;
	const timeFromNow = differenceInSeconds(store.time, pingTime);
	const formattedLastSeen = expr(() => {
		return timeFromNow <= 30 ? 'online' : `last seen ${distanceInWordsToNow(pingTime, {addSuffix: true})}`
	});
	const indicator = <LoaderContainer><LinearProgress style={loader}/></LoaderContainer>;

	return (
		<OuterWrapper>
			<NameSpan theme={muiTheme}>{name}</NameSpan>
			<LastSeenContainer theme={muiTheme}>
				{store.newChatSelected ? indicator : formattedLastSeen}
			</LastSeenContainer>
		</OuterWrapper>
	)
}

export default compose(
	muiThemeable(),
	observer(['store'])
)(ChatHeader)