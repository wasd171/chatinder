import * as React from 'react'
import UserPhotos from './components/UserPhotos'
import UserTitle from './components/UserTitle'
import UserBio from './components/UserBio'
import UserCommonConnections from './components/UserCommonConnections'
import UserCommonInterests from './components/UserCommonInterests'
import { graphql } from 'react-apollo'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import SimpleBarWrapper from 'app/components/SimpleBarWrapper'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as query from './query.graphql'
import * as mutation from './mutation.graphql'
import LoadingStub from 'app/components/LoadingStub'

const UserInfoContainer = styled.div`
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
@graphql(mutation)
@muiThemeable()
@observer
export class UserSection extends React.Component {
	shouldRequestUpdates = false
	@observable isUpdatePending = true

	get person() {
		return this.props.data.match.person
	}

	renderPhotos = () => {
		return <UserPhotos photos={this.person.galleryPhotos} />
	}

	renderTitle = () => {
		const { data, muiTheme } = this.props

		return [
			<Line theme={muiTheme} key="title-line" />,
			<UserTitle
				isSuperLike={data.match.isSuperLike}
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

	renderConnections = () => {
		const { connectionCount, commonConnections } = this.person
		if (connectionCount === null || connectionCount === 0) {
			return null
		}

		return [
			<Line theme={this.props.muiTheme} key="connections-line" />,
			<UserCommonConnections
				connectionCount={connectionCount}
				commonConnections={commonConnections}
				key="connections"
			/>
		]
	}

	renderInterests = () => {
		const { commonInterests } = this.person
		if (commonInterests === null || commonInterests.length === 0) {
			return null
		}

		return [
			<Line theme={this.props.muiTheme} key="interests-line" />,
			<UserCommonInterests
				commonInterests={commonInterests}
				key="interests"
			/>
		]
	}

	renderContent = () => {
		const { data } = this.props
		if (data.loading) {
			return <LoadingStub size={40} />
		}

		return (
			<UserInfoContainer>
				{this.renderPhotos()}
				{this.renderTitle()}
				{this.renderBio()}
				{this.renderConnections()}
				{this.renderInterests()}
			</UserInfoContainer>
		)
	}

	render() {
		return (
			<SimpleBarWrapper>
				{this.renderContent()}
			</SimpleBarWrapper>
		)
	}

	@action
	setUpdateStatus = status => {
		this.isUpdatePending = status
	}

	requestUpdates = () => {
		const { data, mutate } = this.props
		return mutate({
			variables: {
				id: data.match.person._id
			}
		})
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

export default UserSection
