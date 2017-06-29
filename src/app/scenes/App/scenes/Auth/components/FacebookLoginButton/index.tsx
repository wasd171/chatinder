import * as React from 'react'
// import Ripple from '~/app/components/Ripple'
import styled from 'styled-components'

const base = {
	borderRadius: '2px',
	height: '36px',
	transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
}

const OuterWrapper = styled.div`
	height: ${base.height};
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
		rgba(0, 0, 0, 0.117647) 0px 1px 4px;
	border-radius: ${base.borderRadius};
	min-width: 88px;
	margin: 12px;
	transition: ${base.transition};
	&:active {
		box-shadow: rgba(0, 0, 0, 0.156647) 0px 3px 10px,
			rgba(0, 0, 0, 0.227451) 0px 3px 10px;
	}
`

const StyledButton = styled.button`
	border: 10px;
	font-family: Roboto, sans-serif;
	cursor: pointer;
	text-decoration: none;
	margin: 0px;
	padding: 0px;
	position: relative;
	height: ${base.height};
	line-height: ${base.height};
	width: 100%;
	border-radius: ${base.borderRadius};
	text-align: center;
	background-color: #3b5998;
	outline: none;
	transition: ${base.transition};
`

const InnerWrapper = styled.div`
	height: ${base.height};
	border-radius: ${base.borderRadius};
	top: 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
	transition: ${base.transition};
	&:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}
`

const IconSpan = styled.span`
	color: rgb(255, 255, 255);
	font-size: 24px;
	margin-left: 12px;
	line-height: 1;
`

const TextSpan = styled.span`
	position: relative
	opacity: 1
	font-size: 14px
	letter-spacing: 0px
	text-transform: uppercase
	font-weight: 500
	margin: 0px
	padding-left: 8px
	padding-right: 16px
	color: rgb(255, 255, 255)
`

export interface IFacebookLoginButtonProps {
	onClick: React.MouseEventHandler<HTMLDivElement>
}

function FacebookLoginButton({ onClick }: IFacebookLoginButtonProps) {
	return (
		<OuterWrapper onClick={onClick}>
			<StyledButton>
				<div>
					<InnerWrapper>
						{/*<Ripple/>*/}
						<IconSpan className="fa fa-facebook fa-5x" />
						<TextSpan>Login with Facebook</TextSpan>
					</InnerWrapper>
				</div>
			</StyledButton>
		</OuterWrapper>
	)
}

export default FacebookLoginButton
