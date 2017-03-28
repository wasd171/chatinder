import React, {Component} from 'react'
import {computed} from 'mobx'
import {inject, observer} from 'mobx-react'
import Avatar from 'app/components/Avatar'
import {isGIPHY} from 'app/utils'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import {fade} from 'material-ui/utils/colorManipulator'


const paddingNum = 12;

const MatchContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding-left: ${paddingNum}px;
	cursor: pointer;
	width: 100%;
	overflow-x: hidden;
	box-sizing: border-box;
	${props => props.isSelected && `background-color: ${fade(props.theme.palette.textColor, 0.2)};`};
`;

const TextContainer = styled.div`
	marginLeft: ${paddingNum}px;
	paddingRight: ${paddingNum}px;
	width: 100%;
	overflow: hidden;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${props => props.showBorder ? props.theme.palette.borderColor : 'rgba(0, 0, 0, 0)'};
	box-sizing: border-box;
`;

const NameContainer = styled.div`
	color: ${props => props.theme.palette.textColor}
`;

const MessageContainer = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: ${props => props.theme.palette.secondaryTextColor};
	font-size: 14px;
`;

@inject('store')
@muiThemeable()
@observer
class Match extends Component {
	get isSelected() {
		const {store, match} = this.props;

		return store.currentView.params && (store.currentView.params.matchId === match._id)
	}

	get isPreviousSelected() {
		const {store, index} = this.props;

		return store.currentView.params && (store.currentView.params.matchIndex + 1 === index)
	}

	get showBorder() {
		return !(this.isSelected || this.isPreviousSelected || this.props.firstVisible)
	}

	get formattedMessage() {
		const message = this.props.match.messages[this.props.match.messages.length - 1];

		const msg = message ? message.message : null;

		if (!msg) {
			return "It's a match!"
		} else if (isGIPHY(msg)) {
			return "GIPHY"
		} else {
			return <span dangerouslySetInnerHTML={{__html: msg}}/>
		}
	}

	handleClick = () => {
		this.props.store.goToMain({matchId: this.props.match['_id'], matchIndex: this.props.index})
	};

	render() {
		const {match, style, muiTheme} = this.props;

		return (
			<MatchContainer theme={muiTheme} style={style} isSelected={this.isSelected} onClick={this.handleClick}>
				<Avatar match={match} size={46}/>
				<TextContainer showBorder={this.showBorder} theme={muiTheme}>
					<NameContainer theme={muiTheme}>{match.person.name}</NameContainer>
					<MessageContainer theme={muiTheme}>{this.formattedMessage}</MessageContainer>
				</TextContainer>
			</MatchContainer>

		)
	}
}

export default Match