import Inferno from 'inferno'
import Component from 'inferno-component'
import {observable, action, computed} from 'mobx'
import {observer} from 'inferno-mobx'
import {container, containerPressed, button, innerWrapper, innerWrapperHover, textSpan, iconSpan} from './styles'
import Ripple from 'app/components/Ripple'


class FacebookLoginButton extends Component {
	@observable hoverStatus = false;
	@observable pressed = false;

	@action handleMouseOver = () => {
		this.hoverStatus = true;
	};

	@action handleMouseLeave = () => {
		this.hoverStatus = false;
	};

	@action handleMouseDown = () => {
		this.pressed = true;
	};

	@action handleMouseUp = async () => {
		this.pressed = false;
	};

	@computed get hoverStyle() {
		if (this.hoverStatus) {
			return {...innerWrapper, ...innerWrapperHover}
		} else {
			return innerWrapper
		}
	}

	@computed get pressedStyle() {
		if (this.pressed) {
			return containerPressed
		} else {
			return container
		}
	}

	render() {
		return (
			<div
				style={this.pressedStyle}
				onMouseOver={this.handleMouseOver}
				onMouseLeave={this.handleMouseLeave}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onClick={this.props.onClick}
			>
				<button style={button}>
					<div>
						<div style={this.hoverStyle}>
							<Ripple/>
							<i className="fa fa-facebook fa-5x" style={iconSpan}/>
							<span style={textSpan}>Login with Facebook</span>
						</div>
					</div>
				</button>
			</div>
		)
	}
}

export default observer(FacebookLoginButton)