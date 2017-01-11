import Inferno from 'inferno'
import {container} from './styles'
import emojione from 'emojione'


function TextMessage({message}) {
	return (
		<span
			style={container}
			dangerouslySetInnerHTML={{__html: emojione.shortnameToImage(message)}}
		/>
	)
}

export default TextMessage