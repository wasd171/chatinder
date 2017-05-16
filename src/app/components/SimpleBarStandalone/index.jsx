// this is a partial rewrite of SimpleBar
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import styled from 'styled-components'
import linkref from 'app/shims/linkref'

const Track = styled.div`
    height: ${props => props.height}px;
`

const ScrollBar = styled.div`
    height: ${props => props.height}px;
    top: ${props => props.offset}px;
`

@observer class SimpleBarStandalone extends Component {
	flashTimeout
	dragOffset
	track
	scrollbar
	@observable visible = false

	get fitsInScreen() {
		return this.props.clientHeight >= this.props.scrollHeight
	}

	@action showScrollbar = () => {
		this.visible = true
		this.clearFlashTimeout()

		this.flashTimeout = setTimeout(this.hideScrollbar, 1000)
	}

	@action hideScrollbar = () => {
		this.visible = false
		this.clearFlashTimeout()
	}

	constructor(props) {
		super(props)
		this.props.componentRef(this)
	}

	componentWillUnmount() {
		this.clearFlashTimeout()
	}

	clearFlashTimeout = () => {
		if (typeof this.flashTimeout === 'number') {
			clearTimeout(this.flashTimeout)
		}
	}

	startDrag = event => {
		event.preventDefault()

		this.dragOffset =
			event.pageY - this.scrollbar.getBoundingClientRect().top
		document.addEventListener('mousemove', this.drag)
		document.addEventListener('mouseup', this.endDrag)
	}

	drag = event => {
		event.preventDefault()

		const dragPos =
			event.pageY -
			this.track.getBoundingClientRect().top -
			this.dragOffset
		const dragPerc = Math.max(
			Math.min(dragPos / this.props.clientHeight, 1),
			0
		)
		const scrollPos =
			dragPerc * (this.props.scrollHeight - this.props.clientHeight)

		this.props.onScroll({
			clientHeight: this.props.clientHeight,
			scrollHeight: this.props.scrollHeight,
			scrollTop: scrollPos
		})
	}

	endDrag = () => {
		document.removeEventListener('mousemove', this.drag)
		document.removeEventListener('mouseup', this.endDrag)
	}

	render() {
		const { scrollTop, clientHeight, scrollHeight } = this.props

		const scrollbarRatio = clientHeight / scrollHeight
		const scrollPercent = scrollTop / (scrollHeight - clientHeight)
		// Calculate new height/position of drag handle.
		// Offset of 2px allows for a small top/bottom or left/right margin around handle.
		const height = Math.max(
			Math.floor(scrollbarRatio * (clientHeight - 2)) - 2,
			10
		)
		const offset = (clientHeight - 4 - height) * scrollPercent + 2
		const visibilityClassName = this.visible && !this.fitsInScreen
			? 'visible'
			: null

		return (
			<Track
				className="simplebar-track vertical"
				innerRef={linkref(this, 'track')}
				height={clientHeight}
			>
				<ScrollBar
					className={`simplebar-scrollbar ${visibilityClassName}`}
					innerRef={linkref(this, 'scrollbar')}
					height={height}
					offset={offset}
					onMouseDown={this.startDrag}
				/>
			</Track>
		)
	}
}

export default SimpleBarStandalone
