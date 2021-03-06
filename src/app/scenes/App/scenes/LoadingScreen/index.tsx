import * as React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { MuiTheme } from 'material-ui/styles'

const OuterWrapper = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`

const TitleWrapper = styled.h2`
	color: ${props => props.theme.palette.textColor};
`

const ProgressWrapper = styled.div`
	width: 100px;
	margin: auto;
`

export interface IRouteProps {
	title?: string
}

export interface ILoadingScreenProps extends RouteComponentProps<IRouteProps> {
	muiTheme: MuiTheme
}

@muiThemeable()
class LoadingScreen extends React.Component<ILoadingScreenProps> {
	render() {
		const { muiTheme, match } = this.props

		return (
			<OuterWrapper>
				<div>
					<TitleWrapper theme={muiTheme}>
						{match.params.title}
					</TitleWrapper>
					<ProgressWrapper>
						<CircularProgress size={100} thickness={3} />
					</ProgressWrapper>
				</div>
			</OuterWrapper>
		)
	}
}

export default LoadingScreen
