import React, { Component } from 'react'
import HeaderContainer from 'app/components/HeaderContainer'
import Avatar from 'app/components/Avatar'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { graphql } from 'react-apollo'
import profileQuery from './query.graphql'
import { inject } from 'mobx-react'

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
    color: ${props => props.theme.palette.textColor}
`

@inject('navigator')
@muiThemeable()
@graphql(profileQuery)
class ProfileHeader extends Component {
	handleClick = () => {
		this.props.navigator.goToProfile()
	}

	renderLoading() {
		return 'Loading...'
	}

	renderContent(props) {
		const { formattedName, smallPhoto } = props.data.profile.user
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
		return (
			<HeaderContainer>
				<StyledContainer onClick={this.handleClick}>
					{this.props.data.loading
						? this.renderLoading()
						: this.renderContent(this.props)}
				</StyledContainer>
			</HeaderContainer>
		)
	}
}

export default ProfileHeader
