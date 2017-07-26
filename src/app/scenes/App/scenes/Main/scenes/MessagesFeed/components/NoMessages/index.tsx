import * as React from 'react'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { MuiTheme } from 'material-ui/styles'

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

export interface IInjectedProps {
	muiTheme: MuiTheme
}

@muiThemeable()
class NoMessages extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	render() {
		return (
			<Container>
				<Wrapper theme={this.injected.muiTheme}>
					<span>You do not have any messages with this user yet</span>
					<span>Be brave and fix it ;)</span>
				</Wrapper>
			</Container>
		)
	}
}

export default NoMessages
