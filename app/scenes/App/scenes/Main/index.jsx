import React, {Component} from 'react'
import HeaderContainer from './components/HeaderContainer'
import ProfileHeader from './components/ProfileHeader';
import MatchesList from './components/MatchesList'
import ChatSection from './components/ChatSection'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {inject, observer} from 'mobx-react'
import {computed} from 'mobx'
import styled from 'styled-components'


const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	height: 100vh;
	max-height: 100vh;
	min-height: 100vh;
`;

// const BaseSection = styled.section`
// 	height: 100vh;
// 	max-height: 100vh;
// 	position: relative;
// 	display: flex;
// 	flex-direction: column;
// 	overflow-x: hidden;
// 	&::-webkit-scrollbar {
// 		display: none;
// 	}
// `;
function BaseSection(el) {
	return (
		el`
			height: 100vh;
			max-height: 100vh;
			position: relative;
			display: flex;
			flex-direction: column;
			overflow-x: hidden;
			&::-webkit-scrollbar {
				display: none;
			}
		`
	)
}

const MatchesSection = styled(BaseSection(styled.aside))`
	background-color: ${props => props.theme.palette.canvasColor}
	border-right: 1px solid ${props => props.theme.palette.borderColor};
	width: 270px;
	min-width: 270px;
`;

const MainSection = styled(BaseSection(styled.main))`
	background-color: ${props => props.theme.palette.canvasColor}
	width: 100%;
`;


@inject('store')
@muiThemeable()
@observer
class Main extends Component {
	@computed get matchesExist() {
		return (this.props.store.matches.size !== 0)
	}

	@computed get showChat() {
		return !!(this.props.store.currentView.params && this.props.store.currentView.params.matchId)
	}

	render() {
		const children = !this.matchesExist
			?
				`Looks like you don't have any matches =(`
			:
				[
					<MatchesSection theme={muiTheme} key="matches">
						<ProfileHeader/>
						<MatchesList/>
					</MatchesSection>,
					<ChatSection
						show={this.showChat}
						MainSection={MainSection}
						HeaderContainer={HeaderContainer}
						theme={muiTheme}
						key="chat"
					/>
				]
			;

		return (
			<MainContainer theme={muiTheme}>{children}</MainContainer>
		)
	}
}

export default Main