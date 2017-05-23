import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject } from 'mobx-react'
import { KEYCODE_ESC } from 'shared/constants'
import GenericHeader from 'app/components/GenericHeader'
import GenericNameSpan from 'app/components/GenericNameSpan'

@inject('navigator')
@muiThemeable()
class ProfileHeader extends Component {
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
		return (
			<GenericHeader>
				<GenericNameSpan theme={this.props.muiTheme}>
					It is you!
				</GenericNameSpan>
			</GenericHeader>
		)
	}
}

export default ProfileHeader
