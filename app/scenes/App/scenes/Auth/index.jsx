import React, {Component} from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import {inject, observer} from 'mobx-react'
import styled from 'styled-components'


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

@inject('store')
@observer
class Auth extends Component {
	render() {
		return (
			<AuthWrapper>
				<FacebookLoginButton onClick={this.props.store.handleLoginButtonClick}/>
			</AuthWrapper>
		)
	}
}

export default Auth