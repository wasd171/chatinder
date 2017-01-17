import Inferno from 'inferno'
import emojione from 'emojione'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'


const TextSpan = styled.span`
	display: inline-block;
	color: ${props => props.theme.palette.textColor}
`;


function TextMessage({muiTheme, message}) {
	return (
		<TextSpan dangerouslySetInnerHTML={{__html: emojione.shortnameToImage(message)}} theme={muiTheme}/>
	)
}

export default muiThemeable()(TextMessage)