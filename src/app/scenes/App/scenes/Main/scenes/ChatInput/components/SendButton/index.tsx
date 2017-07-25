import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'

const buttonStyle = {
	marginLeft: 10,
	marginBottom: 7
}

export interface ISendButtonProps {
	disabled: boolean
	onClick: React.EventHandler<React.MouseEvent<FlatButton>>
}

function SendButton({ disabled, onClick }: ISendButtonProps) {
	return (
		<FlatButton
			label="Send"
			primary={true}
			disabled={disabled}
			style={buttonStyle}
			onClick={onClick}
		/>
	)
}

export default SendButton
