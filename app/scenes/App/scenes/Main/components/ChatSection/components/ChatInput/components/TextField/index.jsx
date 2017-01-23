import Inferno from 'inferno'
import Component from 'inferno-component'
import Promise from 'bluebird'
import {observable, action} from 'mobx'
import {observer} from 'inferno-mobx'
import {getStyles} from './styles'
import TextFieldHint from 'material-ui/TextField/TextFieldHint'
import EmojiInput from './components/EmojiInput'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import styled from 'styled-components'

// This is a partial rewrite of TextField from material-ui to make it work with Inferno and to fix some bugs


@observer
class TextField extends Component {
	@observable isFocused = false;

	@action handleFocus = () => {
		this.isFocused = true;
	};

	@action handleBlur = () => {
		this.isFocused = false;
	};

	handleInput = async (node, event, getText) => {
		await Promise.delay(50);
		const text = getText();
		console.log({node, event}, node.scrollHeight);
		// const prevHeight = 24*this.props.rows;
		// event.target.style.height = 'auto';
		// event.target.rows = 1;
		// const newHeight = event.target.scrollHeight;
		// const newHeight = node.scrollHeight;
		// event.target.rows = this.props.rows;

		const rows = ~~(node.scrollHeight/24);
		// const rows = this.props.rows + Math.sign(newHeight - prevHeight);
		this.props.onChange({text, rows});
	};

	render() {
		const styles = getStyles(this.props, this.context, this);
		return (
			<div style={styles.root}>
				<TextFieldHint
					muiTheme={this.context.muiTheme}
					show={!this.props.hasValue}
					text={this.props.hintText}
				/>
				<div style={styles.textareaWrapper}>
					<EmojiInput
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onInput={this.handleInput}
						onSubmit={this.props.onSubmit}
					/>
				</div>
				<TextFieldUnderline
					disabled={false}
					focus={this.isFocused}
					muiTheme={this.context.muiTheme}
				/>
			</div>
		)
		// return (
		// 	<div style={styles.root}>
		// 		<TextFieldHint
		// 			muiTheme={this.context.muiTheme}
		// 			show={!this.props.hasValue}
		// 			text={this.props.hintText}
		// 		/>
		// 		<div style={styles.textareaWrapper}>
		// 			<textarea
		// 				style={styles.textarea}
		// 				onFocus={this.handleFocus}
		// 				onBlur={this.handleBlur}
		// 				onInput={this.handleInput}
		// 				value={this.props.value}
		// 				rows={this.props.rows}
		// 			/>
		// 		</div>
		// 		<TextFieldUnderline
		// 			disabled={false}
		// 			focus={this.isFocused}
		// 			muiTheme={this.context.muiTheme}
		// 		/>
		// 	</div>
		// )
	}
}

export default TextField