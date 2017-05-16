import styled from 'styled-components'

export const loadingFullScreen = {
	position: 'absolute',
	zIndex: 100,
	minWidth: '100vw',
	maxWidth: '100vw',
	minHeight: '100vh',
	maxHeight: '100vh',
	overflow: 'hidden'
}

export function normalizeScrollbar(component) {
	return styled(component)`
		&::-webkit-scrollbar {
			width: 11px;
			background-color: transparent;
			overflow: visible;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
		&::-webkit-scrollbar-thumb {
			border: 2px solid rgba(0, 0, 0, 0);
			border-radius: 7px;
			min-height: 10px;
			transition: opacity 0.2s linear;
			background: rgba(108, 110, 113, 0.7);
			background-clip: padding-box;
		}
	`
}
