import Inferno from 'inferno'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FlatButton from 'material-ui/FlatButton'

const buttonStyle = {
	marginLeft: 10,
	marginBottom: 7
};

function MDButton({disabled}) {
	return (
		<FlatButton
			label='Send'
			primary={true}
			disabled={disabled}
			style={buttonStyle}
		/>
	)
}

export default  muiThemeable()(MDButton)