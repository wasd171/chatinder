import onecolor from 'onecolor'


export const container = {
	display: 'flex',
	flexDirection: 'column',
	position: 'relative'
};

export const avatarWrapper = {
	position: 'absolute',
	left: '43px',
	top: '10px'
};

export function nameWrapper(muiTheme) {
	return ({
		position: 'absolute',
		left: '92px',
		top: '11px',
		color: onecolor(muiTheme.palette.primary1Color).alpha(.87).cssa(),
		fontWeight: 500,
		fontSize: '14px',
		lineHeight: '15.5px'
	});
}