import Inferno from 'inferno'
import Component from 'inferno-component'
import {container, padding} from './styles'
import {observable, action, computed} from 'mobx'
import TextFieldMUI from 'material-ui/TextField'
import TextField from './components/TextField'
import SendButton from './components/SendButton'
import {observer} from 'inferno-mobx'


class ChatInput extends Component {
	@observable value  = '';
	@observable rows = 1;
	maxRows = 8;

	@computed get hasValue() {
		return !!this.isValid(this.value)
	}

	@computed get height() {
		return 24*(this.rows + 1)
	}

	@action handleChange = ({event, rows}) => {
		this.value = event.target.value;
		if (this.maxRows >= rows) {
			this.rows = rows
		}
	};

	isValid(value) {
		return value !== '' && value !== undefined && value !== null;
	}


	render() {
		return (
			<div style={container({height: this.height})}>
				<TextField
					fullWidth={true}
					value={this.value}
					hintText='Message'
					rows={this.rows}
					maxRows={this.maxRows}
					multiLine={true}
					onChange={this.handleChange}
					hasValue={this.hasValue}
				/>
				<SendButton disabled={!this.hasValue}/>
			</div>
		);
		// return (
		// 	<div style={container({height: this.height})}>
		// 		<TextField
		// 			rows={1}
		// 			rowsMax={8}
		// 			multiLine={true}
		// 			value={this.value}
		// 			onChange={this.handleChange}
		// 			onFocus={this.handleFocus}
		// 			onBlur={this.handleBlur}
		// 			id="ChatInput-InfernoTextField"
		// 			floatingLabelText="Message"
		// 			fullWidth={true}
		// 			onHeightChange={this.handleHeightChange}
		// 			isValid={this.isValid}
		// 		/>
		// 		<SendButton enabled={this.enableSendButton}/>
		// 	</div>
		// )
	}
}

export default observer(ChatInput)