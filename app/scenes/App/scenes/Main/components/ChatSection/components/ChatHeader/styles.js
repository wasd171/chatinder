export const container = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	width: '100%'
};

export function nameContainer(muiTheme) {
	return ({
		color: muiTheme.palette.textColor
	})
}

export function lastSeenContainer(muiTheme) {
	return ({
		color: muiTheme.palette.secondaryTextColor,
		fontSize: '14px'
	})
}

export const loaderContainer = {
	height: '16px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: '68px',
	position: 'relative',
	overflow: 'hidden'
};

export const loader = {
	height: '4px',
	width: '100%'
};