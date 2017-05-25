import React, { Component } from 'react'
import { inject } from 'mobx-react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { graphql } from 'react-apollo'
import queryName from './query.graphql'
import { KEYCODE_ESC } from 'shared/constants'
import GenericHeader from 'app/components/GenericHeader'
import GenericIconWrapper from 'app/components/GenericIconWrapper'
import GenericNameSpan from 'app/components/GenericNameSpan'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

@inject('navigator')
@graphql(queryName)
@muiThemeable()
class ChatHeader extends Component {
	handleClose = () => {
		this.props.navigator.goToMatches()
	}

	handleClick = () => {
		this.props.navigator.goToUser(this.props.id)
	}

	handleKeydown = e => {
		if (e.keyCode === KEYCODE_ESC) {
			this.handleClose()
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeydown)
	}

	render() {
		if (
			this.props.data.loading &&
			typeof this.props.data.match === 'undefined'
		) {
			return (
				<GenericHeader center>
					<GenericNameSpan theme={this.props.muiTheme}>
						Loading...
					</GenericNameSpan>
				</GenericHeader>
			)
		}

		return (
			<GenericHeader>
				<GenericIconWrapper />
				<GenericNameSpan
					clickable
					theme={this.props.muiTheme}
					onClick={this.handleClick}
					dangerouslySetInnerHTML={{
						__html: this.props.data.match.person.formattedName
					}}
				/>
				<GenericIconWrapper activated onClick={this.handleClose}>
					<NavigationClose
						color={this.props.muiTheme.palette.primary1Color}
					/>
				</GenericIconWrapper>
			</GenericHeader>
		)
	}
}

export default ChatHeader
