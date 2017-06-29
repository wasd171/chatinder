import * as React from 'react'
import styled from 'styled-components'
import CommonInterest, {
	ICommonInterestData
} from './components/CommonInterest'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { MuiTheme } from 'material-ui/styles'

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	cursor: default;
`

const InterestsCount = styled.span`
	color: ${props => props.theme.palette.textColor};
	margin-bottom: 15px;
`

const InterestsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
`

interface IUserCommonInterestData extends ICommonInterestData {
	id: string
}

export interface IUserCommonInterestsProps {
	muiTheme?: MuiTheme
	commonInterests: Array<IUserCommonInterestData>
}

@muiThemeable()
class UserCommonInterests extends React.Component<IUserCommonInterestsProps> {
	renderInterest(interest: IUserCommonInterestData) {
		return <CommonInterest interest={interest} key={interest.id} />
	}

	render() {
		const { muiTheme, commonInterests } = this.props

		return (
			<ContentContainer>
				<InterestsCount theme={muiTheme}>
					Common interests: {commonInterests.length}
				</InterestsCount>
				<InterestsContainer>
					{commonInterests.map(this.renderInterest)}
				</InterestsContainer>
			</ContentContainer>
		)
	}
}

export default UserCommonInterests
