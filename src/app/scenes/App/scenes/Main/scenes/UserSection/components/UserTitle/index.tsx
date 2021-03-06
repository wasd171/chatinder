import * as React from 'react'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import * as distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import * as addYears from 'date-fns/add_years'
import { CircularProgress } from 'material-ui'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ActionWork from 'material-ui/svg-icons/action/work'
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import { Time } from '~/app/stores/Time'
import { MuiTheme } from 'material-ui/styles'

const GenericColumn = styled.div`
	display: flex;
	flex-direction: column;
	color: inherit;
`

const TitleContainer = styled(GenericColumn)`
	color: ${props => props.theme.palette.textColor};
	width: 100%;
	cursor: default;
`

const GenericRow = styled.div`
	display: flex;
	flex-direction: row;
	color: inherit;
	min-height: 20px;
	width: 100%;
`

const iconStyle = { height: 19, width: 19 }
const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${iconStyle.height}px;
	min-width: ${iconStyle.width}px;
	margin-right: 5px;
`

const nameRowHeight = 25
const NameRow = styled(GenericRow)`
	justify-content: space-between;
	align-items: center;
	height: ${nameRowHeight}px;
`

const NameSpan = styled.span`color: inherit;`

const AgeSpan = styled.span`margin-left: 1ex;`

const PaleRow = styled(GenericRow)`
	color: ${props => props.theme.palette.secondaryTextColor};
`

const GenericSpan = styled.span`color: inherit;`

const JobRow = PaleRow
const SchoolRow = PaleRow
const LocationRow = PaleRow

interface ISchool {
	id: string | null
	name: string
}

interface IJob {
	company: null | {
		name: string
	}
	title: null | {
		name: string
	}
}

export interface IUserTitleProps {
	time?: Time
	muiTheme?: MuiTheme
	birthDate: string
	isSuperLike: boolean
	formattedName: string
	isUpdatePending: boolean
	distanceKm: null | number
	schools: null | Array<ISchool>
	jobs: null | Array<IJob>
}

@inject('time')
@muiThemeable()
@observer
class UserTitle extends React.Component<IUserTitleProps> {
	@computed
	get age() {
		return distanceInWordsStrict(
			this.props.time!.now,
			addYears(this.props.birthDate, 1),
			{ unit: 'Y' }
		)
	}

	renderSuperLike = () =>
		<IconWrapper>
			<ToggleStar
				color={this.props.muiTheme!.palette!.accent1Color}
				style={iconStyle}
			/>
		</IconWrapper>

	renderNameAndAge = () =>
		<NameRow>
			<GenericRow>
				{this.props.isSuperLike && this.renderSuperLike()}
				<NameSpan
					dangerouslySetInnerHTML={{
						__html: this.props.formattedName
					}}
				/>
				,
				<AgeSpan>{this.age}</AgeSpan>
			</GenericRow>
			{this.props.isUpdatePending &&
				<CircularProgress size={nameRowHeight} />}
		</NameRow>

	renderJob(job: IJob, index: number) {
		let text
		if (job.company !== null && job.title !== null) {
			text = `${job.title.name} in company ${job.company.name}`
		} else if (job.company !== null && job.title === null) {
			text = job.company.name
		} else if (job.company === null && job.title !== null) {
			text = job.title.name
		} else {
			text = ''
		}

		return (
			<GenericSpan key={index}>
				{text}
			</GenericSpan>
		)
	}

	renderJobs = () => {
		const { jobs, muiTheme } = this.props
		if (jobs === null || typeof jobs === 'undefined' || jobs.length === 0) {
			return null
		}

		return (
			<JobRow theme={muiTheme}>
				<IconWrapper>
					<ActionWork
						color={muiTheme!.palette!.secondaryTextColor}
						style={iconStyle}
					/>
				</IconWrapper>
				<GenericColumn>
					{jobs.map(this.renderJob)}
				</GenericColumn>
			</JobRow>
		)
	}

	renderSchool(school: ISchool, index: number) {
		const key = school.id !== null ? school.id : `${school.name}_${index}`
		return (
			<GenericSpan key={key}>
				{school.name}
			</GenericSpan>
		)
	}

	renderSchools = () => {
		const { schools, muiTheme } = this.props
		if (schools === null || schools.length === 0) {
			return null
		}

		return (
			<SchoolRow theme={muiTheme}>
				<IconWrapper>
					<ActionAccountBalance
						color={muiTheme!.palette!.secondaryTextColor}
						style={iconStyle}
					/>
				</IconWrapper>
				<GenericColumn>
					{schools.map(this.renderSchool)}
				</GenericColumn>
			</SchoolRow>
		)
	}

	renderLocation = () => {
		const { distanceKm, muiTheme } = this.props
		if (distanceKm === null) {
			return null
		}

		return (
			<LocationRow theme={muiTheme}>
				<IconWrapper>
					<CommunicationLocationOn
						color={muiTheme!.palette!.secondaryTextColor}
						style={{ ...iconStyle, paddingRight: 1.5 }}
					/>
				</IconWrapper>
				Km from you: {distanceKm}
			</LocationRow>
		)
	}

	render() {
		return (
			<TitleContainer theme={this.props.muiTheme}>
				{this.renderNameAndAge()}
				{this.renderJobs()}
				{this.renderSchools()}
				{this.renderLocation()}
			</TitleContainer>
		)
	}
}

export default UserTitle
