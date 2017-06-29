import * as React from 'react'
import linkref, { ILinkedRefs } from '~/app/shims/linkref'
import * as Simplebar from 'simplebar'
import styled from 'styled-components'

const Wrapper = styled.div`
	height: 100%;
	max-width: 100%;
`

class SimpleBarWrapper extends React.Component {
	_linkedRefs: ILinkedRefs
	simplebar: SimpleBar
	root: HTMLDivElement

	componentDidMount() {
		this.simplebar = new Simplebar(this.root, {
			wrapContent: false,
			forceEnabled: true
		})
	}

	componentWillUnmount() {
		this.simplebar.unMount()
	}

	render(): JSX.Element {
		return (
			<Wrapper innerRef={linkref(this, 'root')}>
				<div className="simplebar-scroll-content">
					<div className="simplebar-content">
						{this.props.children}
					</div>
				</div>
			</Wrapper>
		)
	}
}

export default SimpleBarWrapper
