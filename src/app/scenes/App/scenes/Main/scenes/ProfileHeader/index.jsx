import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const OuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`

const HeaderSpan = styled.span`
	color: ${props => props.theme.palette.textColor};
`

@muiThemeable()
class ProfileHeader extends Component {
	render() {
		return (
			<OuterWrapper>
				<HeaderSpan theme={this.props.muiTheme}>
					It is you!
				</HeaderSpan>
			</OuterWrapper>
		)
	}
}

export default ProfileHeader
