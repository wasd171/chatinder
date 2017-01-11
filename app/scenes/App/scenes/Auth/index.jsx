import Inferno from 'inferno'
import FacebookLoginButton from './components/FacebookLoginButton'
import {observer} from 'inferno-mobx'
import styled from 'styled-components'


const AuthWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

function Auth({store}) {
	return (
		<AuthWrapper>
			<FacebookLoginButton onClick={store.handleLoginButtonClick}/>
		</AuthWrapper>
	)
}

export default observer(['store'])(Auth)