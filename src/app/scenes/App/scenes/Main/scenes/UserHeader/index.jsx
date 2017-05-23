import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { inject } from 'mobx-react'

const OuterWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: 100%;
	padding-left: 5px;
	padding-right: 5px;
`

const IconWrapper = styled.span`
	width: 17px;
	${props => props.activated && 'cursor: pointer;'}
`

const NameSpan = styled.span`
	color: ${props => props.theme.palette.textColor};
`

@inject('navigator')
@muiThemeable()
class UserHeader extends Component {
	handleClick = () => {
		this.props.navigator.goBack()
	}

	render() {
		return (
			<OuterWrapper>
				<IconWrapper activated onClick={this.handleClick}>
					<NavigationArrowBack
						color={this.props.muiTheme.palette.primary1Color}
					/>
				</IconWrapper>
				<NameSpan theme={this.props.muiTheme}>
					Info
				</NameSpan>
				<IconWrapper />
			</OuterWrapper>
		)
	}
}

export default UserHeader
