export function messageContainer({muiTheme, first}) {
	let style = {
		marginLeft: '92px',
		marginRight: '43px',
		paddingTop: '6px',
		paddingBottom: '7px',
		fontSize: '15px',
		lineHeight: '20px',
		fontWeight: 'normal',
		color: muiTheme.palette.textColor,
		WebkitUserSelect: 'text'
	};

	if (first) {
		style = ({
			...style,
			paddingTop: '29px'
		})
	}

	return style
}

export function firstMessageContainer(muiTheme) {
	return ({
		...messageContainer(muiTheme),
		paddingTop: '29px'
	})
}