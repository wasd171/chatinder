import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { MuiTheme } from 'material-ui/styles'

const Wrapper = styled.span`
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	color: ${props => props.theme.palette.primary1Color};
	border: 1px solid ${props => props.theme.palette.primary1Color};
	border-radius: 5px;
	font-size: 14px;
	padding: 2px;
	margin-right: 5px;
`
export interface ICommonInterestData {
	name: string
}

export interface ICommonInterestProps {
	muiTheme?: MuiTheme
	interest: ICommonInterestData
}

@muiThemeable()
class CommonInterest extends React.Component<ICommonInterestProps> {
	render() {
		return (
			<Wrapper theme={this.props.muiTheme}>
				{this.props.interest.name}
			</Wrapper>
		)
	}
}

export default CommonInterest
