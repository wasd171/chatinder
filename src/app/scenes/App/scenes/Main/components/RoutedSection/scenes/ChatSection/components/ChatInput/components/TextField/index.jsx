import React, {Component} from 'react'
import Promise from 'bluebird'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
// import {getStyles} from './styles'
import TextFieldHint from 'material-ui/TextField/TextFieldHint'
import EmojiInput from './components/EmojiInput'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'

// This is a partial rewrite of TextField from material-ui to make it work with Inferno and to fix some bugs

const OuterWrapper = styled.div`
	width: 100%;
	position: relative;
	display: inline-block;
`;


@muiThemeable()
@observer
class TextField extends Component {
	@observable isFocused = false;

	@action handleFocus = () => {
		this.isFocused = true;
	};

	@action handleBlur = () => {
		this.isFocused = false;
	};

	handleInput = (text) => {
		this.props.onChange(text);
	};

	render() {
		return (
			<OuterWrapper>
				<TextFieldHint
					muiTheme={this.props.muiTheme}
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
					muiTheme={this.props.muiTheme}
				/>
			</OuterWrapper>
		)
	}
}

export default TextField