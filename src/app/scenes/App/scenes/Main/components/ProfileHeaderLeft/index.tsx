import * as React from 'react'
import Avatar from '~/app/components/Avatar'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject } from 'mobx-react'
import { Navigator } from '~/app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'
import { StateType } from '~/shared/definitions'

const StyledContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	padding-left: 12px;
`

const NameWrapper = styled.span`
	margin-left: 12px;
	cursor: pointer;
	font-weight: 400;
	color: ${props => props.theme.palette.textColor};
`

export interface IInjectedProps {
	navigator: Navigator
	muiTheme: MuiTheme
	state: StateType
}

@inject('navigator', 'state')
@muiThemeable()
class ProfileHeaderLeft extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	handleClick = () => {
		this.injected.navigator.goToProfile()
	}

	renderLoading() {
		return 'Loading...'
	}

	renderContent(injected: IInjectedProps) {
		const { user } = injected.state.defaults!
		// const { formattedName, smallPhoto } = injected.data!.profile.user
		return [
			<Avatar src={user.smallPhoto} size={34} key="avatar" />,
			<NameWrapper
				theme={injected.muiTheme}
				key="name"
				dangerouslySetInnerHTML={{ __html: user.formattedName }}
			/>
		]
	}

	render() {
		return (
			<StyledContainer onClick={this.handleClick}>
				{this.renderContent(this.injected)}
				{/* {this.props.data!.loading
					? this.renderLoading()
					: this.renderContent(this.injected)} */}
			</StyledContainer>
		)
	}
}

export default ProfileHeaderLeft
