export const base = {
	borderRadius: '2px',
	height: '36px',
	transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
};

export const container = {
	boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
	borderRadius: base.borderRadius,
	minWidth: '88px',
	margin: '12px',
	transition: base.transition
};

export const containerPressed = {
	...container,
	boxShadow: 'rgba(0, 0, 0, 0.156647) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
};

export const button = {
	border: '10px',
	fontFamily: 'Roboto, sans-serif',
	cursor: 'pointer',
	textDecoration: 'none',
	margin: '0px',
	padding: '0px',
	position: 'relative',
	height: base.height,
	lineHeight: base.height,
	width: '100%',
	borderRadius: base.borderRadius,
	textAlign: 'center',
	backgroundColor: '#3b5998',
	outline: 'none',
	transition: base.transition
};

export const innerWrapper = {
	height: base.height,
	borderRadius: base.borderRadius,
	top: '0px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	transition: base.transition
};

export const innerWrapperHover = {
	backgroundColor: 'rgba(255, 255, 255, 0.4)'
};

export const textSpan = {
	position: 'relative',
	opacity: '1',
	fontSize: '14px',
	letterSpacing: '0px',
	textTransform: 'uppercase',
	fontWeight: '500',
	margin: '0px',
	paddingLeft: '8px',
	paddingRight: '16px',
	color: 'rgb(255, 255, 255)'
};

export const iconSpan = {
	color: 'rgb(255, 255, 255)',
	fontSize: '24px',
	marginLeft: '12px',
	lineHeight: '1'
};