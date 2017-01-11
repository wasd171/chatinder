import Inferno from 'inferno'
import emojione from 'emojione'
import styled from 'styled-components'


const TextSpan = styled.span`
	display: inline-block;
`;


function TextMessage({message}) {
	return (
		<TextSpan dangerouslySetInnerHTML={{__html: emojione.shortnameToImage(message)}}/>
	)
}

export default TextMessage