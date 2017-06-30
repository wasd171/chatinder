import * as React from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import { inject } from 'mobx-react'
import styled from 'styled-components'
import { graphql, MutationFunc } from 'react-apollo'
import * as loginMutation from './loginMutation.graphql'
import { success } from '~/shared/constants'
import { Navigator } from '~/app/stores/Navigator'
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

export interface IAuthProps extends RouteComponentProps<any> {
	navigator?: Navigator
	mutate?: MutationFunc<IGQLRes>
}

@inject('navigator')
@graphql(loginMutation)
class Auth extends React.Component<IAuthProps> {
	handleClick = async () => {
		this.props.navigator!.goToLoading('Performing login')
		const res = await this.props.mutate!({})
		const { status } = res.data.login

		if (status === success.status) {
			this.props.navigator!.goToMatches()
		} else {
			this.props.navigator!.goToAuth()
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
