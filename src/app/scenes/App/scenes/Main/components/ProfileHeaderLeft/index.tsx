import * as React from 'react'
import Avatar from '~/app/components/Avatar'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject, observer } from 'mobx-react'
import { Navigator } from '~/app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'
import { StateType } from '~/shared/definitions'
import ProfileStub from './components/ProfileStub'

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
@observer
class ProfileHeaderLeft extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	handleClick = () => {
		this.injected.navigator.goToProfile()
	}

	render() {
		if (this.injected.state.defaults === null) {
			return <ProfileStub />
		} else {
			const { user } = this.injected.state.defaults
			return (
				<StyledContainer onClick={this.handleClick}>
					<Avatar src={user.smallPhoto} size={34} />
					<NameWrapper
						theme={this.injected.muiTheme}
						dangerouslySetInnerHTML={{ __html: user.formattedName }}
					/>
				</StyledContainer>
			)
		}
	}
}

export default ProfileHeaderLeft
