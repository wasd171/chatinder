import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject } from 'mobx-react'
import { KEYCODE_ESC } from '~/shared/constants'
import GenericHeader from '~/app/components/GenericHeader'
import GenericIconWrapper from '~/app/components/GenericIconWrapper'
import GenericNameSpan from '~/app/components/GenericNameSpan'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Navigator } from '~/app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'

export interface IProfileHeaderProps {
	navigator?: Navigator
	muiTheme: MuiTheme
}

@inject('navigator')
@muiThemeable()
class ProfileHeader extends React.Component<IProfileHeaderProps> {
	handleClose = () => {
		this.props.navigator!.goToMatches()
	}

	handleKeydown = (event: KeyboardEvent) => {
		if (event.keyCode === KEYCODE_ESC) {
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
		return (
			<GenericHeader>
				<GenericIconWrapper />
				<GenericNameSpan theme={this.props.muiTheme}>
					It is you!
				</GenericNameSpan>
				<GenericIconWrapper activated onClick={this.handleClose}>
					<NavigationClose
						color={this.props.muiTheme!.palette!.primary1Color}
					/>
				</GenericIconWrapper>
			</GenericHeader>
		)
	}
}

export default ProfileHeader
