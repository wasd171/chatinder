import Inferno from 'inferno'
import Component from 'inferno-component'
import {container, image, loaderContainer, canvasContainer, canvasPosition} from './styles'
import {getNormalizedSizeOfGIPHY} from 'app/utils'
import {observable, computed, action} from 'mobx'
import {observer} from 'inferno-mobx'
// import {Progress} from 'md-components'
import linkref from 'linkref'


class GIFMessage extends Component {
	blob;
	giphy;
	@observable progress = 0;
	@observable height;
	@observable width;
	@observable animated = false;
	@observable loadComplete = false;

	@computed get loaderStyle() {
		return loaderContainer({height: this.height, width: this.width})
	}

	@computed get canvasStyle() {
		return canvasContainer({height: this.height, width: this.width})
	}

	@action setProgress = (event) => {
		if (event.lengthComputable) {
			this.progress = 100*event.loaded/event.total;
		} else {
			//TODO: add indeterminate loader
		}
	}

	@action setLoadComplete = (load) => {
		this.loadComplete = load;
	}

	@action setDimensions = () => {
		const calculated = getNormalizedSizeOfGIPHY(this.props.message);
		this.height = calculated.height;
		this.width = calculated.width;
	}

	handleLoad = (e) => {
		this.blob = e.currentTarget.response;
		this.setLoadComplete(true);
	}

	drawOnCanvas = () => {
		this.refs.canvas.getContext('2d').drawImage(this.giphy, 0, 0, this.width, this.height);
	}

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
		const loaderDiameter = 0.5*Math.min(this.height, this.width);
		return (
			<div style={this.loaderStyle}>
				<div style={{height: loaderDiameter, width: loaderDiameter}}>
					<span>Loading {this.progress}%</span>
				</div>
			</div>
		)
	}

	renderCanvas = () => {
		return (
			<div style={this.canvasStyle}>
				<canvas style={canvasPosition} ref={linkref(this, 'canvas')}/>
			</div>
		)
	}

	renderGIPHY = () => {
		return (<img src={this.props.message} style={image}/>)
	};

	render() {
		console.log({message: this.props.message});

		return (
			<div style={container}>
				{
					this.animated
						? this.renderGIPHY()
						: this.loadComplete
							? this.renderCanvas()
							: this.renderLoader()
				}
			</div>
		)
	}
}

export default observer(GIFMessage)