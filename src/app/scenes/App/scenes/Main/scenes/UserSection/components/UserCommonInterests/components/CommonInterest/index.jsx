import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const Wrapper = styled.span`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.palette.primary1Color};
    border: 1px solid ${props => props.theme.palette.primary1Color};
    border-radius: 5px;
    font-size: 14px;
    padding: 2px;
    margin-right: 5px;
`

@muiThemeable()
class CommonInterest extends Component {
	render() {
		return (
			<Wrapper theme={this.props.muiTheme}>
				{this.props.interest.name}
			</Wrapper>
		)
	}
}

export default CommonInterest
