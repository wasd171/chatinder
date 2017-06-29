import React, { Component } from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import Promise from 'bluebird'
import linkref from 'app/shims/linkref'
import styled from 'styled-components'

const CanvasWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 100;
`

const RippleCanvas = styled.canvas`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
`

@observer
class Ripple extends Component {
	componentDidMount() {
		this.configureCanvasSize()
		this.setMounted(true)
	}

	componentWillUnmount() {
		this.setMounted(false)
	}

	@observable mounted
	@observable batch = []
	canvasSize = observable.struct({
		width: 100,
		height: 100
	})

	@action
	setMounted = mounted => {
		this.mounted = mounted
	}

	@action
	setCanvasSize = ({ width, height }) => {
		this.canvasSize = {
			width,
			height
		}
	}

	@action
	cleanBatch = () => {
		this.batch = []
	}

	@action
	handleClick = e => {
		if (this.mounted) {
			const coordinates = this.normalizeCoordinates(e)
			const { canvas } = this
			const maxRadius = Math.max(canvas.width, canvas.height)

			const circle = { ...coordinates, radius: 0, maxRadius }
			if (this.batch.push(circle) === 1) {
				requestAnimationFrame(this.tick)
			}
		}
	}

	@action
	tick = () => {
		if (this.mounted) {
			const { canvas } = this
			const ctx = canvas.getContext('2d')
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			this.batch.forEach(circle => {
				const { x, y, maxRadius } = circle
				circle.radius += maxRadius / 40
				ctx.fillStyle = `rgba(255, 255, 255, ${(1 -
					circle.radius / maxRadius) *
					0.4})`
				ctx.beginPath()
				ctx.arc(x, y, circle.radius, 0, 2 * Math.PI)
				ctx.closePath()
				ctx.fill()
			})

			this.batch = this.batch.filter(
				circle => circle.radius < circle.maxRadius
			)

			if (this.batch.length && this.mounted) {
				requestAnimationFrame(this.tick)
			} else {
				this.cleanBatch()
			}
		} else {
			this.cleanBatch()
		}
	}

	@action
	configureCanvasSize = async () => {
		await Promise.delay(20)

		const positions = this.wrapper.getBoundingClientRect()
		this.setCanvasSize(positions)
	}

	normalizeCoordinates = e => {
		const { canvas } = this
		const rect = canvas.getBoundingClientRect()
		const { right, left, top, bottom } = rect

		return {
			x: (e.clientX - left) / (right - left) * canvas.width,
			y: (e.clientY - top) / (bottom - top) * canvas.height
		}
	}

	render() {
		const { width, height } = this.canvasSize

		return (
			<CanvasWrapper innerRef={linkref(this, 'wrapper')}>
				<RippleCanvas
					innerRef={linkref(this, 'canvas')}
					onMouseDown={this.handleClick}
					width={width}
					height={height}
				/>
			</CanvasWrapper>
		)
	}
}

export default Ripple
