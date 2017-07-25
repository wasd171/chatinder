import * as React from 'react'
import { observable, action, computed } from 'mobx'
import TextField from './components/TextField'
import SendButton from './components/SendButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import transitions from 'material-ui/styles/transitions'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { trim } from 'lodash'
import { AbstractAPI } from '~/shared/definitions'
import { MuiTheme } from 'material-ui/styles'

const padding = 10

const OuterWrapper = styled.div`
	border-top: 1px solid ${props => props.theme.palette.borderColor};
	padding-left: ${padding}px;
	padding-right: ${padding}px;
	transition: ${transitions.easeOut('200ms', 'height')};
	display: inline-block;
	max-width: 100%;
	width: 100%;
	posititon: relative;
`

const MiddleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
	max-width: 100%;
	width: 100%;
`

interface IChatInputProps {
	id: string
}

interface IInjectedProps extends IChatInputProps {
	api: AbstractAPI
	muiTheme: MuiTheme
}

@inject('api')
@muiThemeable()
@observer
class ChatInput extends React.Component<IChatInputProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	@observable value: string = ''

	@computed
	get hasValue() {
		return !!this.isValid(this.value)
	}

	get disabled() {
		return !this.hasValue
	}

	@action
	handleChange = (text: string) => {
		this.value = text
	}

	@action
	handleSubmit = () => {
		if (!this.disabled) {
			const message = trim(this.value)
			this.injected.api.sendMessage({
				message,
				matchId: this.props.id
			})
			// this.props.submit({
			// 	message,
			// 	messageId: uuid.v1()
			// })
			this.value = ''
		}
	}

	isValid(value: string) {
		const normValue = trim(value)
		return normValue !== '' && normValue !== undefined && normValue !== null
	}

	render() {
		return (
			<OuterWrapper theme={this.injected.muiTheme}>
				<MiddleWrapper>
					<TextField
						value={this.value}
						hintText="Message"
						onChange={this.handleChange}
						hasValue={this.hasValue}
						onSubmit={this.handleSubmit}
					/>
					<SendButton
						disabled={this.disabled}
						onClick={this.handleSubmit}
					/>
				</MiddleWrapper>
			</OuterWrapper>
		)
	}
}

export default ChatInput

// {
// 	/* rows={this.rows}
// 						maxRows={this.maxRows} */
// }
