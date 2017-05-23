import React, { Component } from 'react'
import NoMatches from './components/NoMatches'
import ProfileHeader from './components/ProfileHeader'
import MatchesList from './scenes/MatchesList'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import checkDoMatchesExist from './checkMutation.graphql'
import startSubscription from './subscribeMutation.graphql'
import LoadingStub from 'app/components/LoadingStub'
import { Route } from 'react-router-dom'
import { VIEW_MATCHES, VIEW_CHAT, VIEW_USER, routes } from 'shared/constants'
import Stub from './scenes/Stub'
import ChatHeader from './scenes/ChatHeader'
import MessagesFeed from './scenes/MessagesFeed'
import ChatInput from './scenes/ChatInput'
import UserHeader from './scenes/UserHeader'
import UserSection from './scenes/UserSection'

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	max-height: 100vh;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 270px auto;
	grid-template-rows: 46px 1fr fit-content(100%);
	grid-template-areas: 	"head-left head-right"
							"aside main"
							"aside footer";
`

const FullPage = styled.div`
	grid-column: 1 / 2;
	grid-row: 1 / 3;
`

const LeftHeaderWrapper = styled.div`
	grid-area: head-left;
	border-right: 1px solid ${props => props.theme.palette.borderColor};
	border-bottom: 1px solid ${props => props.theme.palette.borderColor};
`

const AsideWrapper = styled.div`
	grid-area: aside;
	border-right: 1px solid ${props => props.theme.palette.borderColor};
`

const StubWrapper = styled.div`
	grid-column: head-right;
	grid-row: head-right / footer;
`

const RightHeaderWrapper = styled.div`
	grid-area: head-right;
	border-bottom: 1px solid ${props => props.theme.palette.borderColor};
`

const MainWrapper = styled.div`
	grid-area: main;
`

const FooterWrapper = styled.div`
	grid-area: footer;
	align-self: end;
`

const RightSection = styled.div`
	grid-column: head-right;
	grid-row: main / footer;
`

@graphql(checkDoMatchesExist, { name: 'check' })
@graphql(startSubscription, { name: 'subscribe' })
@muiThemeable()
@observer
class Main extends Component {
	@observable shouldShowContent = undefined

	@action changeStatus = status => {
		this.shouldShowContent = status
	}

	async componentDidMount() {
		const res = await this.props.check()
		const status = res.data.checkDoMatchesExist
		if (status) {
			this.props.subscribe()
		}
		this.changeStatus(status)
	}

	get stub() {
		if (typeof this.shouldShowContent === 'undefined') {
			return (
				<FullPage>
					<LoadingStub size={40} />
				</FullPage>
			)
		}

		if (!this.shouldShowContent) {
			return (
				<FullPage>
					<NoMatches />
				</FullPage>
			)
		}
	}

	renderMatchesList = ({ match }) => (
		<AsideWrapper theme={this.props.muiTheme}>
			<MatchesList match={match} />
		</AsideWrapper>
	)

	renderStub = () => (
		<StubWrapper>
			<Stub />
		</StubWrapper>
	)

	renderChatHeader = ({ match }) => (
		<RightHeaderWrapper theme={this.props.muiTheme}>
			<ChatHeader id={match.params.id} />
		</RightHeaderWrapper>
	)

	renderMessages = ({ match }) => (
		<MainWrapper>
			<MessagesFeed id={match.params.id} />
		</MainWrapper>
	)

	renderInput = ({ match }) => (
		<FooterWrapper>
			<ChatInput id={match.params.id} />
		</FooterWrapper>
	)

	renderUserHeader = () => (
		<RightHeaderWrapper theme={this.props.muiTheme}>
			<UserHeader />
		</RightHeaderWrapper>
	)

	renderUserSection = ({ match }) => (
		<RightSection>
			<UserSection id={match.params.id} />
		</RightSection>
	)

	get children() {
		const { muiTheme } = this.props

		return [
			<LeftHeaderWrapper theme={muiTheme} key="profile-header">
				<ProfileHeader />
			</LeftHeaderWrapper>,
			<Route
				path={`${routes[VIEW_MATCHES]}/:id?`}
				render={this.renderMatchesList}
				key="matches"
			/>,
			<Route
				exact
				path={routes[VIEW_MATCHES]}
				render={this.renderStub}
				key="stub"
			/>,
			<Route
				path={routes[VIEW_CHAT]}
				render={this.renderChatHeader}
				key="chat-header"
			/>,
			<Route
				path={routes[VIEW_CHAT]}
				render={this.renderMessages}
				key="messages"
			/>,
			<Route
				path={routes[VIEW_CHAT]}
				render={this.renderInput}
				key="input"
			/>,
			<Route
				path={routes[VIEW_USER]}
				render={this.renderUserHeader}
				key="user-header"
			/>,
			<Route
				path={routes[VIEW_USER]}
				render={this.renderUserSection}
				key="user"
			/>
		]
		/*return [
			<MatchesSection theme={muiTheme} key="matches">
				<ProfileHeader />
				<Route
					path={`${routes[VIEW_MATCHES]}/:id?`}
					component={MatchesList}
				/>
			</MatchesSection>,
			<RoutedSection key="routed" />
		]*/
	}

	render() {
		return (
			<MainContainer theme={this.props.muiTheme}>
				{this.stub != null ? this.stub : this.children}
			</MainContainer>
		)
	}
}

export default Main
