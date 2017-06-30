import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { MuiTheme } from 'material-ui/styles'

const TextSpan = styled.span`
	display: inline;
	color: ${props => props.theme.palette.textColor};
	position: relative;
	max-height: 20px;
	font-size: 15px;
	line-height: 20px;
	font-weight: normal;
	color: ${props => props.theme.palette.textColor};
	white-space: pre-line;
	user-select: text;
	cursor: text;
`

export interface ITextMessage {
	muiTheme?: MuiTheme
	formattedMessage: string
}

@muiThemeable()
class TextMessage extends React.Component<ITextMessage> {
	render() {
		return (
			<TextSpan
				dangerouslySetInnerHTML={{
					__html: this.props.formattedMessage
				}}
				theme={this.props.muiTheme}
			/>
		)
	}
}

export default TextMessage
