import * as React from 'react'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { MuiTheme } from 'material-ui/styles'

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

interface HeaderProps {
	theme: MuiTheme
}

const Header = styled.div`
	background-color: ${(props: HeaderProps) =>
		props.theme.palette!.primary1Color!};
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`

const CloseWrapper = styled.span`
	color: white;
	font-size: 28px;
	font-weight: bold;
	margin-right: 6px;
	&:hover,
	&:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
`

interface Props {
	onClose: () => void
	children: JSX.Element
}

interface Injected extends Props {
	muiTheme: MuiTheme
}

@muiThemeable()
class Modal extends React.Component<Props> {
	get injected() {
		return this.props as Injected
	}

	render() {
		const { muiTheme, onClose, children } = this.injected
		return (
			<Container>
				<Header theme={muiTheme}>
					<CloseWrapper onClick={onClose}>&times;</CloseWrapper>
				</Header>
				{children}
			</Container>
		)
	}
}

export default Modal
