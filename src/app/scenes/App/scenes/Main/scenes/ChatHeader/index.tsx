import * as React from 'react'
import { inject, observer } from 'mobx-react'
import muiThemeable from 'material-ui/styles/muiThemeable'
// import { graphql, DefaultChildProps } from 'react-apollo'
// import * as queryName from './query.graphql'
import { KEYCODE_ESC } from '~/shared/constants'
import GenericHeader from '~/app/components/GenericHeader'
import GenericIconWrapper from '~/app/components/GenericIconWrapper'
import GenericNameSpan from '~/app/components/GenericNameSpan'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Navigator } from '~/app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'
import { StateType } from '~/shared/definitions'

export interface IChatHeaderProps {
	navigator?: Navigator
	muiTheme?: MuiTheme
	id: string
}

export interface IGQLRes {
	match?: {
		_id: string
		person: {
			_id: string
			formattedName: string
		}
	}
}

// export type ChatHeaderPropsType = DefaultChildProps<IChatHeaderProps, IGQLRes>
export interface IChatHeaderProps {
	id: string
}

interface IInjectedProps extends IChatHeaderProps {
	navigator: Navigator
	muiTheme: MuiTheme
	state: StateType
}

@inject('navigator', 'state')
@muiThemeable()
@observer
class ChatHeader extends React.Component<IChatHeaderProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	get user() {
		return this.injected.state.matches.get(this.props.id)!.person
	}

	handleClose = () => {
		this.injected.navigator.goToMatches()
	}

	handleClick = () => {
		this.injected.navigator.goToUser(this.props.id)
	}

	handleKeydown = (e: KeyboardEvent) => {
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
		return (
			<GenericHeader>
				<GenericIconWrapper />
				<GenericNameSpan
					clickable
					theme={this.props.muiTheme}
					onClick={this.handleClick}
					dangerouslySetInnerHTML={{
						__html: this.user.formattedName
					}}
				/>
				<GenericIconWrapper activated onClick={this.handleClose}>
					<NavigationClose
						color={this.injected.muiTheme.palette!.primary1Color}
					/>
				</GenericIconWrapper>
			</GenericHeader>
		)
	}
}

export default ChatHeader
