import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { MuiTheme } from 'material-ui/styles'

const BioWrapper = styled.div`
	white-space: pre-wrap;
	max-width: 100%;
	color: ${props => props.theme.palette.textColor};
	user-select: text;
	cursor: text;
`

export interface IUserBioProps {
	muiTheme?: MuiTheme
	formattedBio: string
}

@muiThemeable()
class UserBio extends React.Component<IUserBioProps> {
	render() {
		return (
			<BioWrapper
				dangerouslySetInnerHTML={{ __html: this.props.formattedBio }}
				theme={this.props.muiTheme}
			/>
		)
	}
}

export default UserBio
