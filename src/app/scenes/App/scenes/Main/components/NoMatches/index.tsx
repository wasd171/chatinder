import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { RaisedButton } from 'material-ui'
import { MuiTheme } from 'material-ui/styles'
import { inject } from 'mobx-react'
import { AbstractAPI } from '~/shared/definitions'

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Title = styled.h3`color: ${props => props.theme.palette.textColor};`

export interface IMessageProps {
	primary?: boolean
	theme: MuiTheme
}

const Message = styled.p`
	color: ${(props: IMessageProps) =>
		props.primary
			? props.theme.palette!.textColor!
			: props.theme.palette!.secondaryTextColor!};
`

export interface IGQLRes {
	logout: {
		status: string
	}
}

export interface IInjectedProps {
	muiTheme: MuiTheme
	api: AbstractAPI
}

@inject('api')
@muiThemeable()
class NoMatches extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	handleClick = () => {
		this.injected.api.logout()
	}

	render() {
		const { muiTheme } = this.injected
		return (
			<Wrapper>
				<Title theme={muiTheme}>
					Looks like you don not have any matches yet! =(
				</Title>
				<Message theme={muiTheme} primary={true}>
					This app is for chatting purposes only. Use an official
					Tinder app on your phone to find your soulmates
				</Message>
				<Message theme={muiTheme}>
					You can also log out and try another Tinder profile
				</Message>
				<RaisedButton
					label="Log out"
					labelColor={muiTheme!.palette!.primary1Color}
					onTouchTap={this.handleClick}
				/>
			</Wrapper>
		)
	}
}

export default NoMatches
