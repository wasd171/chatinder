import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {cyan500} from 'material-ui/styles/colors'

// TODO fix the bug of scrolling and shady background when deleting a line in Textarea
const theme = getMuiTheme({
	palette: {
		primary1Color: 'rgb(245, 89, 89)',
		primary2Color: cyan500
	}
});

export default theme