import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const StubWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.palette.textColor};
`

@muiThemeable()
class Stub extends Component {
	render() {
		return (
			<StubWrapper theme={this.props.muiTheme}>
				Select your match
			</StubWrapper>
		)
	}
}

export default Stub
