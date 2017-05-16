import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { cyan500 } from 'material-ui/styles/colors'

// TODO fix the bug of scrolling and shady background when deleting a line in Textarea
export default function configureTheme() {
	return getMuiTheme({
		palette: {
			primary1Color: 'rgb(245, 89, 89)',
			accent1Color: 'rgb(59, 164, 253)'
		}
	})
}
