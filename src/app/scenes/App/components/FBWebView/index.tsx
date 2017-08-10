import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import styled from 'styled-components'
import Modal from './components/Modal'
import WebView from './components/WebView'
import { AbstractFB, FBGetTokenType } from '~/shared/definitions'

type Resolver = (data: FBGetTokenType) => any
type Rejecter = (reason?: string) => any

interface IGetTokenArgs {
	silent: boolean
	resolve: Resolver
	reject: Rejecter
}

interface IInjectedProps {
	fb: AbstractFB
}

let authUrl = ``
authUrl += `https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067://authorize/&`
authUrl += `state={"challenge":"q1WMwhvSfbWHvd8xz5PT6lk6eoA%3D","com.facebook.sdk_client_state":true,`
authUrl += `"3_method":"sfvc_auth"}&scope=user_birthday,user_photos,user_education_history,email,`
authUrl += `user_relationship_details,user_friends,user_work_history,user_likes&response_type=token,`
authUrl += `signed_request&default_audience=friends&return_scopes=true&auth_type=rerequest&`
authUrl += `client_id=464891386855067&ret=login&sdk=ios`

let userAgent = ``
userAgent += `Mozilla/5.0 (Linux; U; en-gb; KFTHWI Build/JDQ39) `
userAgent += `AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.16 Safari/535.19`

interface IWrapperProps {
	show: boolean
}

const Wrapper = styled.div`
	position: ${(props: IWrapperProps) => (props.show ? 'fixed' : 'relative')};
	${(props: IWrapperProps) => (props.show ? 'top: 0;' : '')};
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.5);
`

@inject('fb')
@observer
class FBWebView extends React.Component {
	get injected() {
		return this.props as IInjectedProps
	}

	private silent: boolean = true
	private resolve: Resolver = () => {}
	private reject: Rejecter = () => {}
	@observable private empty: boolean = true

	@action
	private toggleEmpty = (empty: boolean) => {
		this.empty = empty
	}

	private handleNavigation = (url: string) => {
		const raw = /access_token=([^&]*)/.exec(url) || null
		const token = raw && raw.length > 1 ? raw[1] : null
		const error = /\?error=(.+)$/.exec(url)

		if (error) {
			this.reject(error[1])
			this.toggleEmpty(true)
			return
		}

		if (token) {
			const expiration = /expires_in=(.*)/.exec(url)
			let expiresIn: number
			if (expiration !== null && expiration.length >= 2) {
				expiresIn = parseInt(expiration[1])
				this.resolve({ token, expiresIn })
			} else {
				this.reject(`Unable to parse expiration from Facebook: ${url}`)
			}
			this.toggleEmpty(true)
		}
	}

	private handleClose = () => {
		if (!this.silent) {
			this.reject()
		}
		this.toggleEmpty(true)
	}

	private handleFailure = () => {
		if (this.silent) {
			this.reject()
			this.toggleEmpty(true)
		}

		if (!this.empty) {
			this.toggleEmpty(false)
			this.toggleEmpty(true)
		}
	}

	public getToken = (args: IGetTokenArgs) => {
		if (!this.empty) {
			args.reject('Another login request is pending')
			return
		}

		Object.assign(this, args)

		this.toggleEmpty(false)
	}

	componentDidMount() {
		this.injected.fb.setComponent(this)
	}

	render() {
		if (this.empty) {
			return null
		} else {
			return (
				<Wrapper show={!this.silent}>
					<Modal onClose={this.handleClose}>
						<WebView
							url={authUrl}
							userAgent={userAgent}
							onNavigate={this.handleNavigation}
							onFail={this.handleFailure}
						/>
					</Modal>
				</Wrapper>
			)
		}
	}
}

export default FBWebView
