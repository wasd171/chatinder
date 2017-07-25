import * as React from 'react'
import NoMatches from './components/NoMatches'
import ProfileHeaderLeft from './components/ProfileHeaderLeft'
import MatchesList from './scenes/MatchesList'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import LoadingStub from '~/app/components/LoadingStub'
import { Route, RouteComponentProps } from 'react-router-dom'
import {
	VIEW_MATCHES,
	VIEW_CHAT,
	VIEW_USER,
	VIEW_PROFILE,
	routes
} from '~/shared/constants'
import Stub from './scenes/Stub'
import ChatHeader from './scenes/ChatHeader'
import MessagesFeed from './scenes/MessagesFeed'
import ChatInput from './scenes/ChatInput'
import UserHeader from './scenes/UserHeader'
import UserSection from './scenes/UserSection'
import ProfileHeader from './scenes/ProfileHeader'
import ProfileSection from './scenes/ProfileSection'
import { MuiTheme } from 'material-ui/styles'
import { AbstractAPI } from '~/shared/definitions'

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	max-height: 100vh;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 270px auto;
	grid-template-rows: 46px 1fr fit-content(100%);
	grid-template-areas: "head-left head-right" "aside main" "aside footer";
`

const FullPage = styled.div`
	grid-column: 1 / span 2;
	grid-row: 1 / span 3;
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

const MainWrapper = styled.div`grid-area: main;`

const FooterWrapper = styled.div`
	grid-area: footer;
	align-self: end;
`

const RightSection = styled.div`
	grid-column: head-right;
	grid-row: main / footer;
`

export interface IRRParams {
	id: string
}

type RenderType = RouteComponentProps<IRRParams>
// export interface IRenderSignature {
// 	match: match<IRRParams>
// }

export interface IMainProps extends RouteComponentProps<IRRParams> {}

export interface IInjectedProps extends IMainProps {
	muiTheme: MuiTheme
	api: AbstractAPI
}

@inject('api')
@muiThemeable()
@observer
class Main extends React.Component<IMainProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	@observable shouldShowContent: boolean | null = null

	@action
	changeStatus = (status: boolean | null) => {
		this.shouldShowContent = status
	}

	async componentDidMount() {
		const { checkDoMatchesExist, subscribeToUpdates } = this.injected.api
		const res = await checkDoMatchesExist()

		if (res) {
			await subscribeToUpdates()
		}
		this.changeStatus(res)
	}

	get stub(): JSX.Element | null {
		if (this.shouldShowContent == null) {
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

		return null
	}

	renderMatchesList = ({ match, location }: RenderType) =>
		<AsideWrapper theme={this.injected.muiTheme}>
			<MatchesList match={match} location={location} />
		</AsideWrapper>

	renderStub = () =>
		<StubWrapper>
			<Stub />
		</StubWrapper>

	renderChatHeader = ({ match }: RenderType) =>
		<RightHeaderWrapper theme={this.injected.muiTheme}>
			<ChatHeader id={match.params.id} />
		</RightHeaderWrapper>

	renderMessages = ({ match }: RenderType) =>
		<MainWrapper>
			<MessagesFeed id={match.params.id} />
		</MainWrapper>

	renderInput = ({ match }: RenderType) =>
		<FooterWrapper>
			<ChatInput id={match.params.id} />
		</FooterWrapper>

	renderUserHeader = () =>
		<RightHeaderWrapper theme={this.injected.muiTheme}>
			<UserHeader />
		</RightHeaderWrapper>

	renderUserSection = ({ match }: RenderType) =>
		<RightSection>
			<UserSection id={match.params.id} />
		</RightSection>

	renderProfileHeader = () =>
		<RightHeaderWrapper theme={this.injected.muiTheme}>
			<ProfileHeader />
		</RightHeaderWrapper>

	renderProfileSection = () =>
		<RightSection>
			<ProfileSection />
		</RightSection>

	get children() {
		const { muiTheme } = this.injected

		return [
			<LeftHeaderWrapper theme={muiTheme} key="profile-header-left">
				<ProfileHeaderLeft />
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
			/>,
			<Route
				path={routes[VIEW_PROFILE]}
				render={this.renderProfileHeader}
				key="profile-header"
			/>,
			<Route
				path={routes[VIEW_PROFILE]}
				render={this.renderProfileSection}
				key="profile-section"
			/>
		]
	}

	render() {
		return (
			<MainContainer theme={this.injected.muiTheme}>
				{this.stub != null ? this.stub : this.children}
			</MainContainer>
		)
	}
}

export default Main
