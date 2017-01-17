import Inferno from 'inferno'
import HeaderContainer from './components/HeaderContainer'
import MatchesList from './components/MatchesList'
import ChatSection from './components/ChatSection'
import compose from 'recompose/compose'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {observer} from 'inferno-mobx'
import {expr} from 'mobx'
import styled from 'styled-components'


const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	height: 100vh;
	max-height: 100vh;
	min-height: 100vh;
`;

const BaseSection = styled.section`
	height: 100vh;
	max-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
`;

const MatchesSection = styled(BaseSection)`
	background-color: ${props => props.theme.palette.canvasColor}
	border-right: 1px solid ${props => props.theme.palette.borderColor};
	width: 270px;
	min-width: 270px;
`;

const MainSection = styled(BaseSection)`
	background-color: ${props => props.theme.palette.canvasColor}
	width: 100%;
`;

function Main({muiTheme, store}) {
		const matchesExist = expr(() => (store.matches.size !== 0));
		const showChat = expr(() => !!(store.currentView.params && store.currentView.params.matchId));
		const children = !matchesExist
			?
				`Looks like you don't have any matches =(`
			:
				[
					<MatchesSection theme={muiTheme}>
						<HeaderContainer>
							Search panel
						</HeaderContainer>
						<MatchesList/>
					</MatchesSection>,
					<ChatSection
						show={showChat}
						MainSection={MainSection}
						HeaderContainer={HeaderContainer}
						theme={muiTheme}
					/>
				]
			;

		return (
			<MainContainer theme={muiTheme}>{children}</MainContainer>
		)

}

export default compose(
	muiThemeable(),
	observer(['store'])
)(Main)