import * as React from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import { inject } from 'mobx-react'
import styled from 'styled-components'
import { success } from '~/shared/constants'
import { Navigator } from '~/app/stores/Navigator'
import { AbstractAPI } from '~/shared/definitions'
import { RouteComponentProps } from 'react-router-dom'

const AuthWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
`

export interface IGQLRes {
	login: {
		status: string
	}
}

interface IAuthProps extends RouteComponentProps<{}> {}
interface IInjectedProps extends IAuthProps {
	navigator: Navigator
	api: AbstractAPI
}

@inject('navigator', 'api')
class Auth extends React.Component<IAuthProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	handleClick = async () => {
		const { navigator, api } = this.injected
		navigator.goToLoading('Performing login')
		const res = await api.login()

		if (res.status === success.status) {
			navigator.goToMatches()
		} else {
			navigator.goToAuth()
		}
	}

	render() {
		return (
			<AuthWrapper>
				<FacebookLoginButton onClick={this.handleClick} />
			</AuthWrapper>
		)
	}
}

export default Auth
