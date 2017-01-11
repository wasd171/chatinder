import transitions from 'material-ui/styles/transitions'

export function container({muiTheme, enabled}) {
	return ({
		width: '88px',
		height: '36px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		cursor: enabled ? 'pointer' : 'default',
		marginBottom: '8px',
		color: enabled ? muiTheme.flatButton.primaryTextColor : muiTheme.flatButton.disabledTextColor,
		textTransform: 'uppercase',
		transition: transitions.easeOut()
	})
}