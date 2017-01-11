export const padding = 10;

export function container({height}) {
	return {
		height: `${height}px`,
		minHeight: `${height}px`,
		borderTop: '1px solid rgb(217, 217, 217)',
		paddingLeft: `${padding}px`,
		paddingRight: `${padding}px`,
		transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end'
	};
}