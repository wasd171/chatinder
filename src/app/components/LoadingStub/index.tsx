import * as React from 'react'
import styled from 'styled-components'
import { CircularProgress } from 'material-ui'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

export interface ILoadingStubProps {
	size: number
}

class LoadingStub extends React.Component<ILoadingStubProps, {}> {
	render() {
		return (
			<Container>
				<CircularProgress size={this.props.size} />
			</Container>
		)
	}
}

export default LoadingStub
