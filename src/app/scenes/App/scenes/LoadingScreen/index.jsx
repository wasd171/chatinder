import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import CircularProgress from 'material-ui/CircularProgress'
import muiThemeable from 'material-ui/styles/muiThemeable'
import compose from 'recompose/compose'
import styled from 'styled-components'


const OuterWrapper = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`;

const TitleWrapper = styled.h2`
	color: ${props => props.theme.palette.textColor}
`;

const ProgressWrapper = styled.div`
	width: 100px;
	margin: auto;
`;

/*export function LoadingScreen({store, title, muiTheme}) {
	console.log('LoadingScreen render');
	return (
		<OuterWrapper>
			<div>
				<TitleWrapper theme={muiTheme}>{title || store.currentView.params.title}</TitleWrapper>
				<ProgressWrapper>
					<CircularProgress size={100} thickness={3}/>
				</ProgressWrapper>
			</div>
		</OuterWrapper>
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
)(LoadingScreen)*/

@inject('view')
@muiThemeable()
@observer
class LoadingScreen extends Component {

	render() {
		const {muiTheme, title, view} = this.props;

		return (
			<OuterWrapper>
				<div>
					<TitleWrapper theme={muiTheme}>{title || view.params.title}</TitleWrapper>
					<ProgressWrapper>
						<CircularProgress size={100} thickness={3}/>
					</ProgressWrapper>
				</div>
			</OuterWrapper>
		)
	}
}

export default LoadingScreen