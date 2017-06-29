import * as React from 'react'
import Avatar from 'app/components/Avatar'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { graphql, DefaultChildProps } from 'react-apollo'
import * as profileQuery from './query.graphql'
import { inject } from 'mobx-react'
import { Navigator } from 'app/stores/Navigator'
import { MuiTheme } from 'material-ui/styles'

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

export interface IGQLRes {
	profile: {
		user: {
			_id: string
			smallPhoto: string
			formattedName: string
		}
	}
}

export interface IProfileHeaderLeftProps {
	navigator?: Navigator
	muiTheme?: MuiTheme
}

export type ProfileHeaderLeftPropsType = DefaultChildProps<
	IProfileHeaderLeftProps,
	IGQLRes
>

@inject('navigator')
@muiThemeable()
@graphql(profileQuery)
class ProfileHeaderLeft extends React.Component<ProfileHeaderLeftPropsType> {
	handleClick = () => {
		this.props.navigator!.goToProfile()
	}

	renderLoading() {
		return 'Loading...'
	}

	renderContent(props: ProfileHeaderLeftPropsType) {
		const { formattedName, smallPhoto } = props.data!.profile.user
		return [
			<Avatar src={smallPhoto} size={34} key="avatar" />,
			<NameWrapper
				theme={props.muiTheme}
				key="name"
				dangerouslySetInnerHTML={{ __html: formattedName }}
			/>
		]
	}

	render() {
		console.log(this.props)
		return (
			<StyledContainer onClick={this.handleClick}>
				{this.props.data!.loading
					? this.renderLoading()
					: this.renderContent(this.props)}
			</StyledContainer>
		)
	}
}

export default ProfileHeaderLeft
