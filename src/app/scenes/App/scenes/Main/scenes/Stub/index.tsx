import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { MuiTheme } from 'material-ui/styles'

export interface IStubWrapperProps {
	theme: MuiTheme
}

const StubWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props: IStubWrapperProps) => props.theme.palette!.textColor!};
`

export interface IStubProps {
	muiTheme?: MuiTheme
}

@muiThemeable()
class Stub extends React.Component<IStubProps> {
	render() {
		return (
			<StubWrapper theme={this.props.muiTheme}>
				Select your match
			</StubWrapper>
		)
	}
}

export default Stub
