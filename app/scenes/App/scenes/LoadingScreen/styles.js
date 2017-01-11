export const wrapper = {
	height: '100vh',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
};

export function titleWrapper(muiTheme) {
	return ({
		color: muiTheme.palette.textColor
	})
}