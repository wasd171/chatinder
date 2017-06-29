import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextMessage from './components/TextMessage'
import GIFMessage from './components/GIFMessage'
import StatusIndicator from './components/StatusIndicator'
import styled from 'styled-components'
import { MuiTheme } from 'material-ui/styles'

interface IMessageWrapperProps {
	first: boolean
}

const MessageWrapper = styled.div`
	margin-left: 92px;
	padding-right: 92px;
	padding-top: ${(props: IMessageWrapperProps) =>
		props.first ? '29' : '6'}px;
	padding-bottom: 7px;
	position: relative;
`

interface ITimestampProps {
	first: boolean
	theme: MuiTheme
}

const Timestamp = styled.span`
	color: ${(props: ITimestampProps) =>
		props.first
			? props.theme.palette!.textColor!
			: props.theme.palette!.secondaryTextColor!};
	font-size: 14px;
	position: absolute;
	top: ${props => (props.first ? '11' : '6')}px;
	right: 20px;
	cursor: default;
`

export interface IMessageProps {
	muiTheme?: MuiTheme
	first: boolean
	sentTime: string
	formattedMessage: string
	status: string
	isGIPHY: boolean
	resend: React.EventHandler<React.MouseEvent<any>>
}

@muiThemeable()
class Message extends React.Component<IMessageProps> {
	render() {
		const {
			muiTheme,
			first,
			sentTime,
			formattedMessage,
			status,
			isGIPHY,
			resend
		} = this.props
		const AppropriateWrapper = isGIPHY ? GIFMessage : TextMessage
		return (
			<MessageWrapper theme={muiTheme} first={first}>
				<StatusIndicator
					status={status}
					first={first}
					resend={resend}
				/>
				<AppropriateWrapper formattedMessage={formattedMessage} />
				<Timestamp theme={muiTheme} first={first}>
					{sentTime}
				</Timestamp>
			</MessageWrapper>
		)
	}
}

export default Message
