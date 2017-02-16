import Inferno from 'inferno'
import emojione from 'emojione'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'


const TextSpan = styled.span`
	display: inline;
	color: ${props => props.theme.palette.textColor};
	position: relative;
	max-height: 20px;
	font-size: 15px;
	line-height: 20px;
	font-weight: normal;
	color: ${props => props.theme.palette.textColor};
	white-space: pre-line;
`;


function TextMessage({muiTheme, message}) {
	return (
		<TextSpan dangerouslySetInnerHTML={{__html: emojione.shortnameToImage(message)}} theme={muiTheme}/>
	)
}

export default muiThemeable()(TextMessage)