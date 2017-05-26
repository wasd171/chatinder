import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const BioWrapper = styled.div`
	white-space: pre-wrap;
	max-width: 100%;
	color: ${props => props.theme.palette.textColor};
	user-select: text;
	cursor: text;
`

@muiThemeable()
class UserBio extends Component {
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
