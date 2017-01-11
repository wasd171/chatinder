import Inferno from 'inferno'
import {wrapper, titleWrapper} from './styles'
import {observer} from 'inferno-mobx'
import CircularProgress from 'material-ui/CircularProgress'
import muiThemeable from 'material-ui/styles/muiThemeable'
import compose from 'recompose/compose'


export function LoadingScreen({store, title, muiTheme}) {
	console.log('LoadingScreen render');
	return (
		<div style={wrapper}>
			<div>
				<h2 style={titleWrapper(muiTheme)}>{title || store.currentView.params.title}</h2>
				<div style={{width: '100px', margin: 'auto'}}>
					<CircularProgress size={100} thickness={3}/>
				</div>
			</div>
		</div>
	);
	// return (
	// 	<div style={wrapper}>
	// 		<div>
	// 			<h2>{title || store.currentView.params.title}</h2>
	// 			<div style={{width: '100px', margin: 'auto'}}>
	// 				<svg class={circular} viewBox="25 25 50 50">
	// 					<circle
	// 						class={path}
	// 						cx="50" cy="50" r="20"
	// 						fill="none" strokeWidth="2" strokeMiterlimit="10"
	// 					/>
	// 				</svg>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}

export default compose(
	muiThemeable(),
	observer(['store'])
)(LoadingScreen)