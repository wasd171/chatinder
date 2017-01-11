import Inferno from 'inferno'
import EnhancedTextarea from 'material-ui/TextField/EnhancedTextarea'


class InfernoEnhancedTextarea extends EnhancedTextarea {
	handleChange = (event) => {
		const freezedEvent = Object.freeze(event);
		super.handleChange(freezedEvent)
	};
}

export default InfernoEnhancedTextarea;