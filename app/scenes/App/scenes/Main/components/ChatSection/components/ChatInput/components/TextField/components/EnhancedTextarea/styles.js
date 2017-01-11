export const rowsHeight = 24;

export const root = {
	position: 'relative',
	fontSize: '16px',
	lineHeight: `${rowsHeight}px`,
	width: '100%',
	marginBottom: '8px'
};

export const inherits = {
	fontStyle: 'inherit',
	fontVariant: 'inherit',
	fontWeight: 'inherit',
	fontStretch: 'inherit',
	fontSize: 'inherit',
	lineHeight: 'inherit',
	fontFamily: 'inherit'
};

export function textareaStyle({height}) {
	return ({
		height,
		width: '100%',
		resize: 'none',
		font: 'inherit',
		padding: 0,
		cursor: 'inherit',
		border: 'none',
		borderBottom: '1px solid rgb(217, 217, 217)',
		WebkitUserSelect: 'none',
		outline: 'none',
		...inherits
	})
}

export const shadow = {
	resize: 'none',
	// Overflow also needed to here to remove the extra row
	// added to textareas in Firefox.
	overflow: 'hidden',
	// Visibility needed to hide the extra text area on ipads
	visibility: 'hidden',
	position: 'absolute',
	height: 'initial',
	...inherits
};