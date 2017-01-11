import Inferno from 'inferno'
import transitions from '../styles/transitions';


const defaultProps = {
	disabled: false,
	disabledStyle: {},
	error: false,
	errorStyle: {},
	focus: false,
	focusStyle: {},
	style: {},
};

const TextFieldUnderline = (props) => {
	const newProps = {...props, ...defaultProps};

	const {
			  disabled,
			  disabledStyle,
			  error,
			  errorStyle,
			  focus,
			  focusStyle,
			  muiTheme,
			  style,
		  } = newProps;

	const {color: errorStyleColor} = errorStyle;

	const {
			  prepareStyles,
			  textField: {
				  borderColor,
				  disabledTextColor,
				  errorColor,
				  focusColor,
			  },
		  } = muiTheme;

	const styles = {
		root: {
			border: 'none',
			borderBottom: 'solid 1px',
			borderColor: borderColor,
			bottom: 8,
			boxSizing: 'content-box',
			margin: 0,
			position: 'absolute',
			width: '100%',
		},
		disabled: {
			borderBottom: 'dotted 2px',
			borderColor: disabledTextColor,
		},
		focus: {
			borderBottom: 'solid 2px',
			borderColor: focusColor,
			transform: 'scaleX(0)',
			transition: transitions.easeOut(),
		},
		error: {
			borderColor: errorStyleColor ? errorStyleColor : errorColor,
			transform: 'scaleX(1)',
		},
	};

	let underline = Object.assign({}, styles.root, style);
	let focusedUnderline = Object.assign({}, underline, styles.focus, focusStyle);

	if (disabled) underline = Object.assign({}, underline, styles.disabled, disabledStyle);
	if (focus) focusedUnderline = Object.assign({}, focusedUnderline, {transform: 'scaleX(1)'});
	if (error) focusedUnderline = Object.assign({}, focusedUnderline, styles.error);

	return (
		<div>
			<hr style={prepareStyles(underline)} />
			<hr style={prepareStyles(focusedUnderline)} />
		</div>
	);
};

export default TextFieldUnderline;