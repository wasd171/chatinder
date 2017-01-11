export const container = {
	paddingTop: '10px',
	paddingBottom: '10px'
};

export const image = {
	maxHeight: '300px',
	maxWidth: '100%'
};

export function smallContainer({height, width}) {
	return ({
		height,
		width,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	})
}

export function loaderContainer({height, width}) {
	return ({
		...smallContainer({height, width}),
		backgroundColor: 'black'
	})
}

export function canvasContainer({height, width}) {
	return ({
		...smallContainer({height, width}),
		position: 'relative'
	})
}

export const canvasPosition = {
	position: 'absolute',
	left: 0,
	top: 0
}