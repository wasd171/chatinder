import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import TextFieldHint from 'material-ui/TextField/TextFieldHint'
import EmojiInput, { onSubmitType } from './components/EmojiInput'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { MuiTheme } from 'material-ui/styles'

// This is a partial rewrite of TextField from material-ui to make it work with Inferno and to fix some bugs

const OuterWrapper = styled.div`
	width: 100%;
	position: relative;
	display: inline-block;
`
export { onSubmitType }
export interface ITextFieldProps {
	hasValue: boolean
	hintText: string
	value: string
	onChange: (value: string) => any
	onSubmit: onSubmitType
}

interface IInjectedProps extends ITextFieldProps {
	muiTheme: MuiTheme
}

@muiThemeable()
@observer
class TextField extends React.Component<ITextFieldProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	@observable isFocused = false

	@action
	handleFocus = () => {
		this.isFocused = true
	}

	@action
	handleBlur = () => {
		this.isFocused = false
	}

	handleInput = (text: string) => {
		this.props.onChange(text)
	}

	render() {
		return (
			<OuterWrapper>
				<TextFieldHint
					muiTheme={this.injected.muiTheme}
					show={!this.props.hasValue}
					text={this.props.hintText}
				/>
				<EmojiInput
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onInput={this.handleInput}
					onSubmit={this.props.onSubmit}
					value={this.props.value}
				/>
				<TextFieldUnderline
					disabled={false}
					focus={this.isFocused}
					muiTheme={this.injected.muiTheme}
				/>
			</OuterWrapper>
		)
	}
}

export default TextField
