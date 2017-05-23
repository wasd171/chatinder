import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Match from './components/Match'
import { AutoSizer, List, ScrollSync } from 'react-virtualized'
import styled from 'styled-components'
import linkref from 'app/shims/linkref'
import SimpleBarStandalone from 'app/components/SimpleBarStandalone'
import { graphql } from 'react-apollo'
import { ipcRenderer } from 'electron'
import {
	SUBSCRIPTION_MATCHES_ALL,
	SUBSCRIPTION_MATCH_BLOCKED
} from 'shared/constants'
import matchesQuery from './query.graphql'

function sorter(a, b) {
	return Date.parse(b.lastActivityDate) - Date.parse(a.lastActivityDate)
}

const queryOptions = {
	props: ({ data: { loading, matches, refetch } }) => ({
		loading,
		sortedMatches: !loading && [...matches].sort(sorter),
		refetch
	})
}

const widthNum = 270
const width = `${widthNum}px`
const rowHeight = 63

const MatchesListContainer = styled.div`
	min-width: ${width};
	width: ${width};
	max-width: ${width};
	max-height: 100%;
	height: 100%;
	box-sizing: border-box;
	user-select: none;
	padding-bottom: 10px;
`

const ListWithoutScrollbar = styled(List)`
	&::-webkit-scrollbar {
		display: none
	}
`

@inject('navigator')
@graphql(matchesQuery, queryOptions)
class MatchesList extends Component {
	disposer
	scrollbar
	scrollHandler
	_index

	get index() {
		if (this.props.match.params.id != null) {
			return this._index
		} else {
			return undefined
		}
	}

	set index(newIndex) {
		this._index = newIndex
	}

	get forceUpdater() {
		return this.props.sortedMatches
	}

	handleContentScroll = (handler, event) => {
		this.scrollbar.showScrollbar()
		handler(event)
	}

	createScrollHandler = handler => {
		if (!this.scrollHandler) {
			this.scrollHandler = this.handleContentScroll.bind(this, handler)
		}

		return this.scrollHandler
	}

	handleMouseEnter = () => {
		this.scrollbar.showScrollbar()
	}

	goToChat = ({ id, index }) => {
		this.index = index
		this.props.navigator.goToChat(id)
	}

	renderAutoSizer = ({ clientHeight, onScroll, scrollHeight, scrollTop }) => (
		<AutoSizer disableWidth={true} forceUpdater={this.forceUpdater}>
			{this.renderContent.bind(this, {
				onScroll,
				scrollTop,
				clientHeight,
				scrollHeight
			})}
		</AutoSizer>
	)

	renderContent = (
		{ onScroll, scrollTop, clientHeight, scrollHeight },
		{ height }
	) => (
		<div onMouseEnter={this.handleMouseEnter}>
			<ListWithoutScrollbar
				height={height}
				width={widthNum}
				rowCount={this.props.sortedMatches.length}
				rowHeight={rowHeight}
				rowRenderer={this.rowRenderer}
				innerRef={linkref(this, 'list')}
				onScroll={this.createScrollHandler(onScroll)}
				scrollTop={scrollTop}
				forceUpdater={this.forceUpdater}
				location={this.props.location}
			/>
			<SimpleBarStandalone
				onScroll={onScroll}
				scrollTop={scrollTop}
				clientHeight={height}
				scrollHeight={scrollHeight}
				componentRef={linkref(this, 'scrollbar')}
			/>
		</div>
	)

	rowRenderer = ({ index, style }) => {
		const match = this.props.sortedMatches[index]
		const { params } = this.props.match
		const firstVisible = index === 0
		let isSelected, isPreviousSelected

		if (params.id !== undefined) {
			isSelected = params.id === match._id
			isPreviousSelected = this.index + 1 === index
		} else {
			isSelected = false
			isPreviousSelected = false
		}

		return (
			<Match
				key={match._id}
				match={match}
				style={style}
				height={rowHeight}
				width={widthNum}
				firstVisible={firstVisible}
				goToChat={this.goToChat}
				isSelected={isSelected}
				isPreviousSelected={isPreviousSelected}
				index={index}
			/>
		)
	}

	render() {
		return (
			<MatchesListContainer>
				{!this.props.loading &&
					<ScrollSync forceUpdater={this.forceUpdater}>
						{this.renderAutoSizer}
					</ScrollSync>}
			</MatchesListContainer>
		)
	}

	handleUpdate = () => {
		this.props.refetch()
	}

	handleBlock = (event, args) => {
		const { params } = this.props.match
		if (params != null && params.id != null && args.id === params.id) {
			this.props.navigator.goToMatches()
		}
	}

	componentDidMount() {
		ipcRenderer.on(SUBSCRIPTION_MATCHES_ALL, this.handleUpdate)
		ipcRenderer.on(SUBSCRIPTION_MATCH_BLOCKED, this.handleBlock)
	}

	componentWillUnmount() {
		ipcRenderer.removeListener(SUBSCRIPTION_MATCHES_ALL, this.handleUpdate)
		ipcRenderer.removeListener(SUBSCRIPTION_MATCH_BLOCKED, this.handleBlock)
	}
}

export default MatchesList
