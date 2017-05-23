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

const NameSpan = styled.span`
	color: ${props => props.theme.palette.textColor};
`

@muiThemeable()
class UserHeader extends Component {
	render() {
		return (
			<OuterWrapper>
				<NameSpan theme={this.props.muiTheme}>
					Info
				</NameSpan>
			</OuterWrapper>
		)
	}
}

export default UserHeader
