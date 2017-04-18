import React, {Component} from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import {inject, observer} from 'mobx-react'
import styled from 'styled-components'
import {gql, graphql} from 'react-apollo'


const loginMutation = gql`
	mutation loginMutation {
		login(silent: false) {
			status
		}
	}
`;

const AuthWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

/*function Auth({store}) {
	return (
		<AuthWrapper>
			<FacebookLoginButton onClick={store.handleLoginButtonClick}/>
		</AuthWrapper>
	)
}

export default observer(['store'])(Auth)*/

@inject('navigator')
@graphql(loginMutation)
class Auth extends Component {
	handleClick = async () => {
		this.props.navigator.goToLoading('Performing login');
		await this.props.mutate();
		this.props.navigator.goToMain();
	}

	render() {
		console.log({props: this.props});

		return (
			<AuthWrapper>
				<FacebookLoginButton onClick={this.handleClick}/>
			</AuthWrapper>
		)
	}
}

export default Auth