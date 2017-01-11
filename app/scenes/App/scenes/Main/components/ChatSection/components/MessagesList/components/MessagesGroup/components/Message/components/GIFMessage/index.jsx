import Inferno from 'inferno'
import Component from 'inferno-component'
import CircularProgress from 'material-ui/CircularProgress'
import {getNormalizedSizeOfGIPHY} from 'app/utils'
import {observable, action} from 'mobx'
import {observer} from 'inferno-mobx'
import linkref from 'linkref'
import styled from 'styled-components'


const OuterWrapper = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
`;

const AnimatedGIPHY = styled.img`
	max-height: 300px;
	max-width: 100%;
`;

const BaseContainer = styled.div`
	height: ${props => props.height}px;
	width: ${props => props.width}px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CanvasWrapper = styled(BaseContainer)`
	position: relative;
	cursor: pointer;
`;

const CanvasPreview = styled.canvas`
	position: absolute;
	left: 0;
	top: 0;
`;

const LoaderWrapper = styled(BaseContainer)`
	background-color: black;
`;

class GIFMessage extends Component {
	blob;
	giphy;
	@observable progress = 0;
	@observable height;
	@observable width;
	@observable animated = false;
	@observable loadComplete = false;

	@action setProgress = (event) => {
		if (event.lengthComputable) {
			this.progress = 100*event.loaded/event.total;
		} else {
			this.progress = 'none';
		}
	};

	@action setLoadComplete = (load) => {
		this.loadComplete = load;
	};

	@action setDimensions = () => {
		const calculated = getNormalizedSizeOfGIPHY(this.props.message);
		this.height = calculated.height;
		this.width = calculated.width;
	};

	handleLoad = (e) => {
		this.blob = e.currentTarget.response;
		this.setLoadComplete(true);
	};

	drawOnCanvas = () => {
		this.refs.canvas.getContext('2d').drawImage(this.giphy, 0, 0, this.width, this.height);
	};

	constructor(props) {
		super(props);
		this.setDimensions();
	}

	componentDidMount() {
		const req = new XMLHttpRequest();
		req.addEventListener('progress', this.setProgress);
		req.addEventListener('load', this.handleLoad)
		req.open('GET', this.props.message, true);
		req.responseType = 'blob';
		req.send();
	}

	componentDidUpdate() {
		const {canvas} = this.refs;
		if (canvas) {
			canvas.height = this.height;
			canvas.width = this.width;
			if (!this.giphy) {
				this.giphy = new Image();
				this.giphy.addEventListener('load', () => {
					this.drawOnCanvas()
					URL.revokeObjectURL(this.giphy.src);
				});
				this.giphy.src = URL.createObjectURL(this.blob);
			} else {
				this.drawOnCanvas();
			}
		}

	}

	renderLoader = () => {
		const loaderDiameter = 0.3*Math.min(this.height, this.width);
		let loader;
		if (typeof this.progress === 'string') {
			loader = <CircularProgress size={loaderDiameter}/>
		} else {
			loader = <CircularProgress size={loaderDiameter} mode='determinate' value={this.progress}/>
		}
		return (
			<LoaderWrapper height={this.height} width={this.width}>
				{loader}
			</LoaderWrapper>
		)
	};

	renderCanvas = () => {
		return (
			<CanvasWrapper height={this.height} width={this.width}>
				<CanvasPreview innerRef={linkref(this, 'canvas')}/>
			</CanvasWrapper>
		)
	};

	renderGIPHY = () => {
		return <AnimatedGIPHY src={this.props.message}/>
	};

	render() {
		console.log({message: this.props.message});

		return (
			<OuterWrapper>
				{
					this.animated
						? this.renderGIPHY()
						: this.loadComplete
							? this.renderCanvas()
							: this.renderLoader()
				}
			</OuterWrapper>
		)
	}
}

export default observer(GIFMessage)