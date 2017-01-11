import Inferno from 'inferno'
import {observer} from 'inferno-mobx'
import {expr} from 'mobx'
import {container, lastSeenContainer, loader, loaderContainer, nameContainer} from './styles'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import LinearProgress from 'material-ui/LinearProgress'
import compose from 'recompose/compose'
import muiThemeable from 'material-ui/styles/muiThemeable'


function ChatHeader({store, muiTheme}) {
	const currentMatch = store.matches.get(store.currentView.params.matchId);
	const name = expr(() => currentMatch.person.name);
	const pingTime = currentMatch.person.pingTime;
	const timeFromNow = differenceInSeconds(store.time, pingTime);
	const formattedLastSeen = expr(() => {
		return timeFromNow <= 30 ? 'online' : `last seen ${distanceInWordsToNow(pingTime, {addSuffix: true})}`
	});
	const indicator = <div style={loaderContainer}><LinearProgress style={loader}/></div>;

	return (
		<div style={container}>
			<span style={nameContainer(muiTheme)}>{name}</span>
			<div style={lastSeenContainer(muiTheme)}>
				{store.newChatSelected ? indicator : formattedLastSeen}
			</div>
		</div>
	)
}

export default compose(
	muiThemeable(),
	observer(['store'])
)(ChatHeader)