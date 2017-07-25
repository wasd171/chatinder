import * as React from 'react'
import UserPhotos from '../UserSection/components/UserPhotos'
import UserTitle from '../UserSection/components/UserTitle'
import UserBio from '../UserSection/components/UserBio'
// import { graphql } from 'react-apollo'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import SimpleBarWrapper from '~/app/components/SimpleBarWrapper'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
// import * as query from './query.graphql'
// import * as mutation from './mutation.graphql'
// import * as logoutMutation from './logoutMutation.graphql'
// import LoadingStub from '~/app/components/LoadingStub'
import { RaisedButton } from 'material-ui'
import { AbstractAPI, StateType } from '~/shared/definitions'
import { MuiTheme } from 'material-ui/styles'

const ProfileInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20px;
	margin-left: auto;
	margin-right: auto;
	max-width: 500px;
	min-height: 100%;
`

const Line = styled.hr`
	width: 100%;
	margin-top: 15px;
	margin-bottom: 15px;
	border: none;
	height: 1px;
	background-color: ${props => props.theme.palette.borderColor};
`

interface IInjectedProps {
	api: AbstractAPI
	muiTheme: MuiTheme
	state: StateType
}

@inject('api', 'state')
@muiThemeable()
@observer
class ProfileSection extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	shouldRequestUpdates = false
	@observable isUpdatePending = true

	get person() {
		return this.injected.state.defaults!.user
		// return this.props.data.profile.user
	}

	renderPhotos = () => {
		return <UserPhotos photos={this.person.galleryPhotos} />
	}

	renderTitle = () => {
		const { muiTheme } = this.injected

		return [
			<Line theme={muiTheme} key="title-line" />,
			<UserTitle
				isSuperLike={false}
				formattedName={this.person.formattedName}
				birthDate={this.person.birth_date}
				isUpdatePending={this.isUpdatePending}
				schools={this.person.schools}
				distanceKm={this.person.distanceKm}
				jobs={this.person.jobs}
				key="title"
			/>
		]
	}

	renderBio = () => {
		if (
			this.person.formattedBio === '' ||
			this.person.formattedBio === null
		) {
			return null
		} else {
			return [
				<Line theme={this.injected.muiTheme} key="bio-line" />,
				<UserBio formattedBio={this.person.formattedBio} key="bio" />
			]
		}
	}

	renderLogout = () => {
		return [
			<Line theme={this.injected.muiTheme} key="logout-line" />,
			<RaisedButton
				onClick={this.injected.api.logout}
				label="log out"
				primary={true}
				key="logout"
			/>
		]
	}

	renderContent = () =>
		<ProfileInfoContainer>
			{this.renderPhotos()}
			{this.renderTitle()}
			{this.renderBio()}
			{this.renderLogout()}
		</ProfileInfoContainer>

	render() {
		return (
			<SimpleBarWrapper>
				{this.renderContent()}
			</SimpleBarWrapper>
		)
	}

	@action
	setUpdateStatus = (status: boolean) => {
		this.isUpdatePending = status
	}

	async componentDidMount() {
		await this.injected.api.updateProfile()
		this.setUpdateStatus(false)
		// if (this.props.data.loading) {
		// 	this.shouldRequestUpdates = true
		// } else {
		// 	await this.requestUpdates()
		// 	this.setUpdateStatus(false)
		// }
	}

	// async componentDidUpdate() {
	// 	if (!this.props.data.loading && this.shouldRequestUpdates) {
	// 		this.shouldRequestUpdates = false
	// 		this.setUpdateStatus(true)
	// 		await this.requestUpdates()
	// 		this.setUpdateStatus(false)
	// 	}
	// }
}

export default ProfileSection
