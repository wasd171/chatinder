import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { inject } from 'mobx-react'
import { KEYCODE_ESC } from 'shared/constants'
import GenericHeader from 'app/components/GenericHeader'
import GenericIconWrapper from 'app/components/GenericIconWrapper'
import GenericNameSpan from 'app/components/GenericNameSpan'
import { Navigator } from 'app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'

export interface IUserHeaderProps {
	navigator?: Navigator
	muiTheme?: MuiTheme
}

@inject('navigator')
@muiThemeable()
class UserHeader extends React.Component<IUserHeaderProps> {
	handleClick = () => {
		this.props.navigator!.goBack()
	}

	handleKeydown = (event: KeyboardEvent) => {
		if (event.keyCode === KEYCODE_ESC) {
			this.handleClick()
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
				<GenericIconWrapper activated onClick={this.handleClick}>
					<NavigationArrowBack
						color={this.props.muiTheme!.palette!.primary1Color}
					/>
				</GenericIconWrapper>
				<GenericNameSpan theme={this.props.muiTheme}>
					Info
				</GenericNameSpan>
				<GenericIconWrapper />
			</GenericHeader>
		)
	}
}

export default UserHeader
