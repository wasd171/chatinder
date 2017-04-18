import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FlatButton from 'material-ui/FlatButton'

const buttonStyle = {
	marginLeft: 10,
	marginBottom: 7
};

function MDButton({disabled, onClick}) {
	return (
		<FlatButton
			label='Send'
			primary={true}
			disabled={disabled}
			style={buttonStyle}
			onClick={onClick}
		/>
	)
}

export default  muiThemeable()(MDButton)