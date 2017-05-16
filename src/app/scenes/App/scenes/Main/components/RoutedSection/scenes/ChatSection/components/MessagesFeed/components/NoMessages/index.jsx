import React, { Component } from 'react'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 34px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.palette.secondaryTextColor};
`

@muiThemeable()
class NoMessages extends Component {
	render() {
		return (
			<Container>
				<Wrapper theme={this.props.muiTheme}>
					<span>You don't have any messages with this user yet</span>
					<span>Be brave and fix it ;)</span>
				</Wrapper>
			</Container>
		)
	}
}

export default NoMessages
