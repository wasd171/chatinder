import Inferno from 'inferno'
import Component from 'inferno-component'
import {root, textareaStyle, shadow, rowsHeight} from './styles'
import {observable, action, computed} from 'mobx'
import {observer} from 'inferno-mobx'
import linkref from 'linkref'


class EnhancedTextarea extends Component {
	@observable height;

	@computed get inputStyle() {
		return textareaStyle({height: this.height})
	}

	@action setHeight = (height) => {
		this.height = height;
	};

	componentWillMount() {
		this.setHeight(this.props.rows * rowsHeight);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.syncHeightWithShadow();
	}

	componentWillReact() {
		this.syncHeightWithShadow(this.props.value);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
	}

	handleResize = (event) => {
		this.syncHeightWithShadow(undefined, event);
	};

	syncHeightWithShadow = (newValue, event) => {
		const shadow = this.refs.shadow;

		if (newValue !== undefined) {
			shadow.value = newValue;
		}

		let newHeight = shadow.scrollHeight;

		// Guarding for jsdom, where scrollHeight isn't present.
		// See https://github.com/tmpvar/jsdom/issues/1013
		if (newHeight === undefined) return;

		if (this.props.rowsMax >= this.props.rows) {
			newHeight = Math.min(this.props.rowsMax * rowsHeight, newHeight);
		}

		newHeight = Math.max(newHeight, rowsHeight);

		if (this.height !== newHeight) {
			this.setHeight(newHeight);
			if (this.props.onHeightChange) {
				this.props.onHeightChange(event, newHeight);
			}
		}
	};

	@action handleChange = (event) => {
		if (this.props.onChange) {
			this.props.onChange(event);
		}

		this.syncHeightWithShadow(event.target.value);
	};

	handleFocus = (event) => {
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	};

	handleBlur = (event) => {
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	};

	render() {
		return (
			<div style={root}>
				<textarea
					ref={linkref(this, 'shadow')}
					style={shadow}
					tabIndex="-1"
					rows={this.props.rows}
					defaultValue={this.props.defaultValue}
					readOnly={true}
					id="txtshadow"
				/>
				<textarea
					ref={linkref(this, 'input')}
					rows={this.props.rows}
					style={this.inputStyle}
					onInput={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={this.props.value}
					id="textarea"
				/>
			</div>
		)
	}
}

export default EnhancedTextarea