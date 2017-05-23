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
import { VIEW_MATCHES, routes } from 'shared/constants'
import Stub from './scenes/Stub'

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	max-height: 100vh;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 270px auto;
	grid-template-rows: 46px auto auto;
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
