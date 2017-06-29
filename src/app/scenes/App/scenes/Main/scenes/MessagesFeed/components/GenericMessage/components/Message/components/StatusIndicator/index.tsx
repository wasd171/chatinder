import * as React from 'react'
import { SUCCESS, PENDING, FAILURE } from 'shared/constants'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { CircularProgress } from 'material-ui'
import AlertError from 'material-ui/svg-icons/alert/error'
import { MuiTheme } from 'material-ui/styles'

interface IWrapperProps {
	first: boolean
}

const Wrapper = styled.div`
	position: absolute;
	top: ${(props: IWrapperProps) => (props.first ? '19' : '8')}px;
	left: -79px;
	height: 17px;
	width: 17px;
`

export interface IStatusIndicatorProps {
	muiTheme?: MuiTheme
	resend: React.EventHandler<React.MouseEvent<AlertError>>
	status: string
	first: boolean
}

@muiThemeable()
class StatusIndicator extends React.Component<IStatusIndicatorProps> {
	renderLoader() {
		return <CircularProgress size={17} />
	}

	renderError = () => {
		return (
			<AlertError
				color={this.props.muiTheme!.palette!.primary1Color!}
				style={{ height: 17, width: 17, cursor: 'pointer' }}
				onClick={this.props.resend}
			/>
		)
	}

	renderContent = (status: string) => {
		switch (status) {
			case SUCCESS:
				return null
			case PENDING:
				return this.renderLoader()
			case FAILURE:
				return this.renderError()
			default:
				throw new Error('Unknown status type for message.status')
		}
	}

	render() {
		return (
			<Wrapper first={this.props.first}>
				{this.renderContent(this.props.status)}
			</Wrapper>
		)
	}
}

export default StatusIndicator
