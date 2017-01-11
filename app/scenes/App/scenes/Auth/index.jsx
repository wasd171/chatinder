import Inferno from 'inferno'
import FacebookLoginButton from './components/FacebookLoginButton'
import {wrapper} from './styles'
import {observer} from 'inferno-mobx'


function Auth({store}) {
	return (
		<div style={wrapper}>
			<FacebookLoginButton onClick={store.handleLoginButtonClick}/>
		</div>
	)
}

export default observer(['store'])(Auth)