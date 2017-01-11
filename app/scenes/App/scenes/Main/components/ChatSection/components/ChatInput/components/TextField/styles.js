export const container = {
	position: 'relative',
	width: '100%'
};

import transitions from 'material-ui/styles/transitions'

export function getStyles(props, context, state) {
	const {
		baseTheme,
		textField: {
			floatingLabelColor,
			focusColor,
			textColor,
			disabledTextColor,
			backgroundColor,
			errorColor,
		},
	} = context.muiTheme;

	const styles = {
		root: {
			fontSize: 16,
			lineHeight: '24px',
			width: props.fullWidth ? '100%' : 256,
			height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
			display: 'inline-block',
			position: 'relative',
			backgroundColor: backgroundColor,
			fontFamily: baseTheme.fontFamily,
			transition: transitions.easeOut('200ms', 'height'),
			cursor: props.disabled ? 'not-allowed' : 'auto',
		},
		textareaWrapper: {
			overflowY: 'hidden',
			transition: transitions.easeOut('250ms', 'height'),
			height: (props.rows + 1)*24
		},
		error: {
			position: 'relative',
			bottom: 2,
			fontSize: 12,
			lineHeight: '12px',
			color: errorColor,
			transition: transitions.easeOut(),
		},
		floatingLabel: {
			color: props.disabled ? disabledTextColor : floatingLabelColor,
			pointerEvents: 'none',
		},
		input: {
			padding: 0,
			position: 'relative',
			width: '100%',
			border: 'none',
			outline: 'none',
			backgroundColor: 'rgba(0,0,0,0)',
			color: props.disabled ? disabledTextColor : textColor,
			cursor: 'inherit',
			font: 'inherit',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
		},
		inputNative: {
			appearance: 'textfield', // Improve type search style.
		},
	};

	styles.textarea = Object.assign({}, styles.input, {
		marginTop: props.floatingLabelText ? 36 : 12,
		marginBottom: props.floatingLabelText ? -36 : -12,
		boxSizing: 'border-box',
		font: 'inherit',
		resize: 'none'
	});

	// Do not assign a height to the textarea as he handles it on his own.
	styles.input.height = '100%';

	if (state.isFocused) {
		styles.floatingLabel.color = focusColor;
	}

	if (props.floatingLabelText) {
		styles.input.boxSizing = 'border-box';

		if (!props.multiLine) {
			styles.input.marginTop = 14;
		}

		if (state.errorText) {
			styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
		}
	}

	if (state.errorText) {
		if (state.isFocused) {
			styles.floatingLabel.color = styles.error.color;
		}
	}

	return styles;
};