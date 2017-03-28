import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {computed} from 'mobx'
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


@inject('store')
@muiThemeable()
@observer
class ChatHeader extends Component {
	@computed get currentMatch() {
		return this.props.store.matches.get(this.props.store.currentView.params.matchId);
	}

	@computed get name() {
		return this.currentMatch.person.name;
	}

	@computed get pingTime() {
		return this.currentMatch.person.pingTime;
	}

	@computed get timeFromNow() {
		return differenceInSeconds(this.props.store.time, this.pingTime)
	}

	@computed get formattedLastSeen() {
		return this.timeFromNow <= 30 ? 'online' : `last seen ${distanceInWordsToNow(this.pingTime, {addSuffix: true})}`
	}

	get indicator() {
		return <LoaderContainer><LinearProgress style={loader}/></LoaderContainer>;
	}

	render() {
		return (
			<OuterWrapper>
				<NameSpan theme={muiTheme}>{this.name}</NameSpan>
				<LastSeenContainer theme={muiTheme}>
					{this.props.store.newChatSelected ? this.indicator : this.formattedLastSeen}
				</LastSeenContainer>
			</OuterWrapper>
		)
	}
}

export default ChatHeader