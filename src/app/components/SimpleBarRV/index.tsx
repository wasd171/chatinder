import * as React from 'react'
import {
	AutoSizer,
	ScrollSync,
	OnScrollParams,
	Dimensions,
	ScrollSyncChildProps
} from 'react-virtualized'
import linkref, { ILinkedRefs } from '~/app/shims/linkref'
import SimpleBarStandalone from '~/app/components/SimpleBarStandalone'
import styled from 'styled-components'

const Container = styled.div`
	height: 100%;
	width: 100%;
`

type MergedType = Dimensions & ScrollSyncChildProps
export interface IMergedProps extends MergedType {
	handleListScroll: (event: OnScrollParams) => any
}

interface ISimpleBarRVProps {
	forceUpdater: {}
	onScroll?: (props: OnScrollParams) => any
	children: (props?: IMergedProps) => JSX.Element
	simple: boolean
}

class SimpleBarRV extends React.Component<ISimpleBarRVProps> {
	_linkedRefs: ILinkedRefs
	scrollbar: SimpleBarStandalone
	scrollHandler: (params: OnScrollParams) => any

	customScrollHandler = (event: OnScrollParams) => {
		if (this.props.onScroll) {
			this.props.onScroll(event)
		}
		this.scrollHandler(event)
	}

	handleListScroll = (event: OnScrollParams) => {
		this.scrollbar.showScrollbar()
		this.customScrollHandler(event)
	}

	handleScrollbarScroll = (event: OnScrollParams) => {
		this.customScrollHandler(event)
	}

	handleMouseEnter = () => {
		this.scrollbar.showScrollbar()
	}

	renderChildren = (props: MergedType): JSX.Element => {
		const { onScroll, scrollTop, scrollHeight, height } = props
		this.scrollHandler = onScroll
		return (
			<div onMouseEnter={this.handleMouseEnter}>
				{this.props.children({
					...props,
					handleListScroll: this.handleListScroll
				})}
				<SimpleBarStandalone
					onScroll={this.handleScrollbarScroll}
					scrollTop={scrollTop}
					clientHeight={height}
					scrollHeight={scrollHeight}
					componentRef={linkref(this, 'scrollbar')}
				/>
			</div>
		)
	}

	renderScrollSync = (props: Dimensions) =>
		<ScrollSync forceUpdater={this.props.forceUpdater}>
			{(scrollProps: ScrollSyncChildProps) =>
				this.renderChildren({ ...props, ...scrollProps })}
		</ScrollSync>

	render() {
		let content: JSX.Element
		if (this.props.simple) {
			content = this.props.children()
		} else {
			content = (
				<AutoSizer forceUpdater={this.props.forceUpdater}>
					{this.renderScrollSync}
				</AutoSizer>
			)
		}

		return (
			<Container>
				{content}
			</Container>
		)
	}
}

export default SimpleBarRV
