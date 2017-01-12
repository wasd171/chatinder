import Inferno from 'inferno'
import Component from 'inferno-component'
import {observable, action, computed} from 'mobx'
import TextField from './components/TextField'
import SendButton from './components/SendButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import transitions from 'material-ui/styles/transitions'
import {observer} from 'inferno-mobx'
import styled from 'styled-components'


const padding = 10;

const OuterWrapper = styled.div`
	height: ${props => `${props.height}px`};
	min-height: ${props => `${props.height}px`};
	border-top: 1px solid ${props => props.theme.palette.borderColor};
	padding-left: ${padding}px;
	padding-right: ${padding}px;
	transition: ${transitions.easeOut('200ms', 'height')};
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;

@muiThemeable()
@observer(['store'])
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
			<OuterWrapper height={this.height} theme={this.props.muiTheme}>
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
			</OuterWrapper>
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

export default ChatInput