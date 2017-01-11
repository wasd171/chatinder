import Inferno from 'inferno'
import HeaderContainer from './components/HeaderContainer'
import MatchesList from './components/MatchesList'
import ChatSection from './components/ChatSection'
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
	border-right: 1px solid rgb(217, 217, 217);
	width: 270px;
	min-width: 270px;
`;

const MainSection = styled(BaseSection)`
	width: 100%;
`;

function Main({store}) {
		const matchesExist = expr(() => (store.matches.size !== 0));
		const showChat = expr(() => !!(store.currentView.params && store.currentView.params.matchId));
		const children = !matchesExist
			?
				`Looks like you don't have any matches =(`
			:
				[
					<MatchesSection>
						<HeaderContainer>
							Search panel
						</HeaderContainer>
						<MatchesList/>
					</MatchesSection>,
					<ChatSection show={showChat} MainSection={MainSection} HeaderContainer={HeaderContainer}/>
				]
			;

		return (
			<MainContainer>{children}</MainContainer>
		)

}

export default observer(['store'])(Main)