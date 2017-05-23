import React, { Component } from 'react'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { fade } from 'material-ui/utils/colorManipulator'
import Avatar from 'app/components/Avatar'
import { inject } from 'mobx-react'

const OuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`

const AvatarWrapper = styled.div`
	position: absolute;
	left: 43px;
	top: 10px;
	cursor: pointer;
`

const NameWrapper = styled.span`
	position: absolute;
	left: 92px;
	top: 11px;
	color: ${props => fade(props.theme.palette.primary1Color, 0.87)};
	font-weight: 500;
	font-size: 14px;
	line-height: 15.5px;
	cursor: pointer;
	z-index: 2;
`

@inject('navigator')
@muiThemeable()
class FirstMessage extends Component {
	handleClick = () => {
		if (!this.props.me) {
			this.props.navigator.goToUser(this.props.matchId)
		} else {
			this.props.navigator.goToProfile()
		}
	}

	render() {
		const { muiTheme, children, user } = this.props

		return (
			<OuterWrapper>
				<AvatarWrapper onClick={this.handleClick}>
					<Avatar size={38} src={user.smallPhoto} />
				</AvatarWrapper>
				<NameWrapper theme={muiTheme} onClick={this.handleClick}>
					{user.name}
				</NameWrapper>
				{children}
			</OuterWrapper>
		)
	}
}

export default FirstMessage
