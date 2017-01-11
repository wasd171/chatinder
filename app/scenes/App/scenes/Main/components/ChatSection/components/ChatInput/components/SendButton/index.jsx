import Inferno from 'inferno'
import Component from 'inferno-component'
import {container} from './styles'
import muiThemeable from 'material-ui/styles/muiThemeable'
// import {Button} from 'md-components'
import FlatButton from 'material-ui/FlatButton'

class MDButton extends Component {
	render() {
		return (
			<FlatButton
				label='Send'
				primary={true}
				disabled={this.props.disabled}
				style={{marginLeft: 10, marginBottom: 7}}/>
		)
	}
	// render() {
	// 	return (
	// 		<button
	// 			className="mui-btn mui-btn--primary"
	// 			ref={ref => this.refs.button = ref}
	// 			id="unique-button"
	// 		>
	// 			Send
	// 		</button>
	// 	)
	// }
}


function SendButton({muiTheme, enabled}) {
	return (
		<div style={container({muiTheme, enabled})}>
			Send
		</div>
	)
}

function Btn({muiTheme, enabled}) {
	console.log('Btn', enabled);
	return (
		<div style={{paddingBottom: '8px'}}>
			<FlatButton disabled={!enabled}>Send</FlatButton>
		</div>
	)
}

export default  muiThemeable()(MDButton)

// export default muiThemeable()(SendButton)