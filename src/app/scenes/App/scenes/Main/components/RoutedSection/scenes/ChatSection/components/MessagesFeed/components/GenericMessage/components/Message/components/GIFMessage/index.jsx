import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { getNormalizedSizeOfGIPHY } from 'shared/utils'
import { observable, action, computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import linkref from 'app/shims/linkref'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'
import { SUCCESS, PENDING, FAILURE } from 'shared/constants'

const OuterWrapper = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
`

const AnimatedGIPHY = styled.img`
	max-height: 300px;
	max-width: 100%;
	cursor: pointer;
	height: ${props => props.height}px;
	width: ${props => props.width}px;
`

const BaseContainer = styled.div`
	height: ${props => props.height}px;
	width: ${props => props.width}px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const CanvasWrapper = styled(BaseContainer)`
	position: relative;
	cursor: pointer;
`

const CanvasPreview = styled.canvas`
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
`

const BaseIconButton = styled.div`
	width: 50px;
	height: 50px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -25px;
	margin-top: -25px;
	border-radius: 50%;
	z-index: 1;
	cursor: pointer;
`

const PlayButton = styled(BaseIconButton)`
	background-color: rgba(0, 0, 0, .5);
	&:hover {
		background-color: rgba(0, 0, 0, .6);
	}
`

const PlayIcon = styled.i`
	font-size: 24px;
	line-height: 24px;
	color: white;
	position: absolute;
	top: 13px;
	left: 18px;
`

const ReloadButton = styled(BaseIconButton)`
	background-color: rgba(255, 255, 255, .5);
	&:hover {
		background-color: rgba(255, 255, 255, .6);
	}
`

const ReloadIcon = styled.i`
	font-size: 30px;
	line-height: 30px;
	color: white;
	position: absolute;
	top: 10px;
	left: 13px;
`

const LoaderWrapper = styled(BaseContainer)`
	background-color: black;
	position: relative;
`

@inject('caches')
@observer
class GIFMessage extends Component {
	blob
	giphy
	req = null
	@observable progress = 'none'
	@observable height
	@observable width
	@observable animated = false

	get loadStatus() {
		const { _gifs } = this.props.caches
		const key = this.props.formattedMessage

		if (!_gifs.has(key)) {
			_gifs.set(key, PENDING)
		}
		return _gifs.get(key)
	}

	@action startAnimation = () => {
		this.animated = true
	}

	@action stopAnimation = () => {
		this.animated = false
	}

	@action setProgress = event => {
		if (event.lengthComputable) {
			this.progress = 100 * event.loaded / event.total
		} else {
			this.progress = 'none'
		}
	}

	@action setLoadStatus = status => {
		this.props.caches.setGifStatus(this.props.formattedMessage, status)
	}

	@action setDimensions = () => {
		const calculated = getNormalizedSizeOfGIPHY(this.props.formattedMessage)
		this.height = Math.floor(calculated.height)
		this.width = Math.floor(calculated.width)
	}

	handleLoad = e => {
		this.blob = e.currentTarget.response
		this.setLoadStatus(SUCCESS)
	}

	handleError = e => {
		this.setLoadStatus(FAILURE)
	}

	drawOnCanvas = () => {
		if (this.canvas) {
			this.canvas
				.getContext('2d')
				.drawImage(this.giphy, 0, 0, this.width, this.height)
		}
	}

	loadGif = () => {
		if (this.req !== null) {
			this.req.abort()
			this.req = null
		}

		this.setLoadStatus(PENDING)

		const req = new XMLHttpRequest()
		req.addEventListener('progress', this.setProgress)
		req.addEventListener('load', this.handleLoad)
		req.addEventListener('error', this.handleError)
		req.open('GET', this.props.formattedMessage, true)
		req.responseType = 'blob'
		req.send()
		this.req = req
	}

	constructor(props) {
		super(props)
		this.setDimensions()
	}

	componentDidMount() {
		this.loadGif()
	}

	componentDidUpdate() {
		const { canvas } = this
		if (canvas) {
			canvas.height = this.height
			canvas.width = this.width
			if (!this.giphy) {
				this.giphy = new Image()
				this.giphy.addEventListener('load', () => {
					this.drawOnCanvas()
					URL.revokeObjectURL(this.giphy.src)
				})
				this.giphy.src = URL.createObjectURL(this.blob)
			} else {
				this.drawOnCanvas()
			}
		}
	}

	componentWillUnmount() {
		if (this.req !== null) {
			this.req.abort()
			this.req = null
		}
	}

	renderLoader = () => {
		const loaderDiameter = 0.3 * Math.min(this.height, this.width)
		let loader
		if (typeof this.progress === 'string') {
			loader = <CircularProgress size={loaderDiameter} />
		} else {
			loader = (
				<CircularProgress
					size={loaderDiameter}
					mode="determinate"
					value={this.progress}
				/>
			)
		}
		return (
			<LoaderWrapper height={this.height} width={this.width}>
				{loader}
			</LoaderWrapper>
		)
	}

	renderCanvas = () => {
		return (
			<CanvasWrapper
				height={this.height}
				width={this.width}
				onClick={this.startAnimation}
			>
				<PlayButton>
					<PlayIcon className="fa fa-play" />
				</PlayButton>
				<CanvasPreview innerRef={linkref(this, 'canvas')} />
			</CanvasWrapper>
		)
	}

	renderFailure = () => {
		return (
			<LoaderWrapper height={this.height} width={this.width}>
				<ReloadButton onClick={this.loadGif}>
					<ReloadIcon className="fa fa-refresh" />
				</ReloadButton>
			</LoaderWrapper>
		)
	}

	renderGIPHY = () => {
		return (
			// Using inner div here because Waypoint requires it
			(
				<Waypoint onLeave={this.stopAnimation}>
					<div style={{ height: this.height, width: this.width }}>
						<AnimatedGIPHY
							src={this.props.formattedMessage}
							onClick={this.stopAnimation}
							height={this.height}
							width={this.width}
						/>
					</div>
				</Waypoint>
			)
		)
	}

	render() {
		let content
		if (this.animated) {
			content = this.renderGIPHY()
		} else {
			switch (this.loadStatus) {
				case SUCCESS:
					content = this.renderCanvas()
					break
				case PENDING:
					content = this.renderLoader()
					break
				case FAILURE:
					content = this.renderFailure()
					break
			}
		}

		return (
			<OuterWrapper>
				{content}
			</OuterWrapper>
		)
	}
}

export default GIFMessage
