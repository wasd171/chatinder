import React, { Component } from 'react'
import { inject } from 'mobx-react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { graphql } from 'react-apollo'
import queryName from './query.graphql'
import { KEYCODE_ESC } from 'shared/constants'
import GenericHeader from 'app/components/GenericHeader'
import GenericNameSpan from 'app/components/GenericNameSpan'

@inject('navigator')
@graphql(queryName)
@muiThemeable()
class ChatHeader extends Component {
	handleClick = () => {
		this.props.navigator.goToUser(this.props.id)
	}

	handleKeydown = e => {
		if (e.keyCode === KEYCODE_ESC) {
			this.props.navigator.goToMatches()
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
				<GenericHeader>
					<GenericNameSpan>
						Loading...
					</GenericNameSpan>
				</GenericHeader>
			)
		}

		return (
			<GenericHeader>
				<GenericNameSpan
					theme={this.props.muiTheme}
					onClick={this.handleClick}
					dangerouslySetInnerHTML={{
						__html: this.props.data.match.person.formattedName
					}}
				/>
			</GenericHeader>
		)
	}
}

export default ChatHeader
