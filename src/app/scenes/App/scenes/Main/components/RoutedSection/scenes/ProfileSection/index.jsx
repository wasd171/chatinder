import React, { Component } from 'react'
import MainSection from 'app/components/MainSection'
import HeaderContainer from 'app/components/HeaderContainer'
import ProfileHeader from './components/ProfileHeader'
import UserPhotos from '../UserSection/components/UserPhotos'
import UserTitle from '../UserSection/components/UserTitle'
import UserBio from '../UserSection/components/UserBio'
import { graphql } from 'react-apollo'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import SimpleBarWrapper from 'app/components/SimpleBarWrapper'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import query from './query.graphql'
import mutation from './mutation.graphql'
import logoutMutation from './logoutMutation.graphql'
import LoadingStub from 'app/components/LoadingStub'
import { RaisedButton } from 'material-ui'

const Wrapper = styled.div`
	height: 100%
	max-height: 100%;
	max-width: 100%;
	overflow-y: scroll;
`

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

@graphql(query)
@graphql(mutation, { name: 'update' })
@graphql(logoutMutation, { name: 'logout' })
@muiThemeable()
@observer
class ProfileSection extends Component {
	shouldRequestUpdates = false
	@observable isUpdatePending = true

	get person() {
		return this.props.data.profile.user
	}

	renderPhotos = () => {
		return <UserPhotos photos={this.person.galleryPhotos} />
	}

	renderTitle = () => {
		const { data, muiTheme } = this.props

		return [
			<Line theme={muiTheme} key="title-line" />,
			<UserTitle
				isSuperLike={false}
				formattedName={this.person.formattedName}
				birthDate={this.person.birthDate}
				isUpdatePending={this.isUpdatePending}
				schools={this.person.schools}
				distanceKm={this.person.distanceKm}
				jobs={this.person.jobs}
				key="title"
			/>
		]
	}

	renderBio = () => {
		if (this.person.formattedBio === '') {
			return null
		}

		return [
			<Line theme={this.props.muiTheme} key="bio-line" />,
			<UserBio formattedBio={this.person.formattedBio} key="bio" />
		]
	}

	renderLogout = () => {
		return [
			<Line theme={this.props.muiTheme} key="logout-line" />,
			<RaisedButton
				onClick={this.props.logout}
				label="log out"
				primary={true}
				key="logout"
			/>
		]
	}

	renderContent = () => {
		const { data, muiTheme } = this.props
		if (data.loading) {
			return <LoadingStub size={40} />
		}
		return (
			<ProfileInfoContainer>
				{this.renderPhotos()}
				{this.renderTitle()}
				{this.renderBio()}
				{this.renderLogout()}
			</ProfileInfoContainer>
		)
	}

	render() {
		return (
			<MainSection>
				<HeaderContainer>
					<ProfileHeader />
				</HeaderContainer>
				<SimpleBarWrapper>
					{this.renderContent()}
				</SimpleBarWrapper>
			</MainSection>
		)
	}

	@action setUpdateStatus = status => {
		this.isUpdatePending = status
	}

	requestUpdates = () => {
		return this.props.update()
	}

	async componentDidMount() {
		if (this.props.data.loading) {
			this.shouldRequestUpdates = true
		} else {
			await this.requestUpdates()
			this.setUpdateStatus(false)
		}
	}

	async componentDidUpdate() {
		if (!this.props.data.loading && this.shouldRequestUpdates) {
			this.shouldRequestUpdates = false
			this.setUpdateStatus(true)
			await this.requestUpdates()
			this.setUpdateStatus(false)
		}
	}
}

export default ProfileSection
