import React, {Component} from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import {inject, observer} from 'mobx-react'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import loginMutation from './loginMutation.graphql'


const AuthWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

@inject('navigator')
@graphql(loginMutation)
class Auth extends Component {
	handleClick = async () => {
		this.props.navigator.goToLoading('Performing login');
		await this.props.mutate();
		this.props.navigator.goToMain();
	}

	render() {
		return (
			<AuthWrapper>
				<FacebookLoginButton onClick={this.handleClick}/>
			</AuthWrapper>
		)
	}
}

export default Auth