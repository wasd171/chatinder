import React, { Component } from 'react'
import { inject } from 'mobx-react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import queryName from './query.graphql'

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
	cursor: pointer;
`

@inject('navigator')
@graphql(queryName)
@muiThemeable()
class ChatHeader extends Component {
	handleClick = () => {
		this.props.navigator.goToUser(this.props.id)
	}

	render() {
		if (
			this.props.data.loading &&
			typeof this.props.data.match === 'undefined'
		) {
			return <OuterWrapper>Loading...</OuterWrapper>
		}

		return (
			<OuterWrapper>
				<NameSpan
					theme={this.props.muiTheme}
					onClick={this.handleClick}
					dangerouslySetInnerHTML={{
						__html: this.props.data.match.person.formattedName
					}}
				/>
			</OuterWrapper>
		)
	}
}

export default ChatHeader
