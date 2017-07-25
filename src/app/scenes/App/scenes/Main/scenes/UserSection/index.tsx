import * as React from 'react'
import UserPhotos from './components/UserPhotos'
import UserTitle from './components/UserTitle'
import UserBio from './components/UserBio'
import UserCommonConnections from './components/UserCommonConnections'
import UserCommonInterests from './components/UserCommonInterests'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import SimpleBarWrapper from '~/app/components/SimpleBarWrapper'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { AbstractAPI, StateType } from '~/shared/definitions'
import { MuiTheme } from 'material-ui/styles'

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

interface IUserSectionProps {
	id: string
}

interface IInjectedProps extends IUserSectionProps {
	state: StateType
	muiTheme: MuiTheme
	api: AbstractAPI
}

@inject('api', 'state')
@muiThemeable()
@observer
export class UserSection extends React.Component<IUserSectionProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	@observable isUpdatePending = true

	get match() {
		return this.injected.state.matches.get(this.props.id)!
	}

	get person() {
		return this.match.person
	}

	renderPhotos = () => {
		return <UserPhotos photos={this.person.galleryPhotos} />
	}

	renderTitle = () => {
		const { is_super_like } = this.match
		const isSuperLike = is_super_like === null ? false : is_super_like

		return [
			<Line theme={this.injected.muiTheme} key="title-line" />,
			<UserTitle
				isSuperLike={isSuperLike}
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
		}

		return [
			<Line theme={this.injected.muiTheme} key="bio-line" />,
			<UserBio formattedBio={this.person.formattedBio} key="bio" />
		]
	}

	renderConnections = () => {
		const { connection_count, common_connections } = this.person
		if (
			connection_count === null ||
			connection_count === 0 ||
			common_connections === null
		) {
			return null
		}

		return [
			<Line theme={this.injected.muiTheme} key="connections-line" />,
			<UserCommonConnections
				connectionCount={connection_count}
				commonConnections={common_connections}
				key="connections"
			/>
		]
	}

	renderInterests = () => {
		const { common_interests } = this.person
		if (common_interests === null || common_interests.length === 0) {
			return null
		}

		return [
			<Line theme={this.injected.muiTheme} key="interests-line" />,
			<UserCommonInterests
				commonInterests={common_interests}
				key="interests"
			/>
		]
	}

	renderContent = () => {
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
	setUpdateStatus = (status: boolean) => {
		this.isUpdatePending = status
	}

	async componentDidMount() {
		await this.injected.api.updatePerson(this.person)
		this.setUpdateStatus(false)
	}
}

export default UserSection
