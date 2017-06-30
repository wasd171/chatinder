import * as React from 'react'
import { inject } from 'mobx-react'
import Match from './components/Match'
import { AutoSizer, List, ScrollSync } from 'react-virtualized'
import styled from 'styled-components'
import linkref, { ILinkedRefs } from '~/app/shims/linkref'
import SimpleBarStandalone from '~/app/components/SimpleBarStandalone'
import { graphql, OperationOption } from 'react-apollo'
import { ipcRenderer } from 'electron'
import {
	SUBSCRIPTION_MATCHES_ALL,
	SUBSCRIPTION_MATCH_BLOCKED,
	VIEW_PROFILE
} from '~/shared/constants'
import * as matchesQuery from './query.graphql'
import { Navigator } from '~/app/stores/Navigator'
import { match } from 'react-router-dom'

interface ISorter {
	lastActivityDate: string
}

function sorter(a: ISorter, b: ISorter) {
	return Date.parse(b.lastActivityDate) - Date.parse(a.lastActivityDate)
}

interface IGQLResMatch {
	_id: string
	lastMessage: {
		formattedMessage: string
		status: string
		sentDay: string
		_id: string
	}
	lastActivityDate: string
	person: {
		_id: string
		formattedName: string
		smallPhoto: string
	}
}

export interface IGQLProps {
	loading: boolean
	sortedMatches?: Array<IGQLResMatch>
	refetch: Function
}

interface IGQLOptions {
	matches: Array<IGQLResMatch>
}

const queryOptions: OperationOption<{}, IGQLOptions> = {
	props: ({ data }) => {
		if (typeof data !== 'undefined') {
			const { loading, matches, refetch } = data

			return {
				loading,
				sortedMatches: !loading && [...matches!].sort(sorter),
				refetch
			}
		} else {
			return undefined
		}
	}
}

const rowHeight = 63

const ListWithoutScrollbar = styled(List)`
	&::-webkit-scrollbar {
		display: none
	}
`

export interface IRRProps {
	id?: string
}

export interface IMatchesListProps {
	navigator?: Navigator
	loading?: boolean
	sortedMatches?: Array<IGQLResMatch>
	refetch?: Function
	match: match<IRRProps>
}

export interface IEventRV {
	scrollTop: number
	scrollHeight: number
	clientHeight: number
}

export type HandlerType = (event: IEventRV) => any

@inject('navigator')
@graphql(matchesQuery, queryOptions)
class MatchesList extends React.Component<IMatchesListProps> {
	_linkedRefs: ILinkedRefs
	disposer: Function
	scrollbar: SimpleBarStandalone
	scrollHandler: HandlerType
	_index: number | null = null

	get index(): number | null {
		if (this.props.match.params.id != null) {
			return this._index
		} else {
			return null
		}
	}

	set index(newIndex: number | null) {
		this._index = newIndex
	}

	get forceUpdater() {
		return this.props.sortedMatches
	}

	handleContentScroll = (handler: HandlerType, event: IEventRV) => {
		this.scrollbar.showScrollbar()
		handler(event)
	}

	createScrollHandler = (handler: HandlerType) => {
		if (!this.scrollHandler) {
			this.scrollHandler = this.handleContentScroll.bind(this, handler)
		}

		return this.scrollHandler
	}

	handleMouseEnter = () => {
		this.scrollbar.showScrollbar()
	}

	goToChat = ({ id, index }: { id: string; index: number }) => {
		this.index = index
		this.props.navigator!.goToChat(id)
	}

	renderAutoSizer = ({
		clientHeight,
		onScroll,
		scrollHeight,
		scrollTop
	}: {
		clientHeight: number
		scrollHeight: number
		scrollTop: number
		onScroll: HandlerType
	}) =>
		<AutoSizer forceUpdater={this.forceUpdater}>
			{this.renderContent.bind(this, {
				onScroll,
				scrollTop,
				clientHeight,
				scrollHeight
			})}
		</AutoSizer>

	renderContent = (
		{
			onScroll,
			scrollTop,
			scrollHeight
		}: { scrollTop: number; scrollHeight: number; onScroll: HandlerType },
		{ height, width }: { height: number; width: number }
	) =>
		<div onMouseEnter={this.handleMouseEnter}>
			<ListWithoutScrollbar
				height={height}
				width={width}
				rowCount={this.props.sortedMatches!.length}
				rowHeight={rowHeight}
				rowRenderer={this.rowRenderer}
				innerRef={linkref(this, 'list')}
				onScroll={this.createScrollHandler(onScroll)}
				scrollTop={scrollTop}
				forceUpdater={this.forceUpdater}
			/>
			<SimpleBarStandalone
				onScroll={onScroll}
				scrollTop={scrollTop}
				clientHeight={height}
				scrollHeight={scrollHeight}
				componentRef={linkref(this, 'scrollbar')}
			/>
		</div>

	rowRenderer = ({ index, style }: { index: number; style: Object }) => {
		const match = this.props.sortedMatches![index]
		const { params } = this.props.match
		const firstVisible = index === 0
		let isSelected: boolean, isPreviousSelected: boolean

		if (params.id !== undefined && params.id !== VIEW_PROFILE) {
			isSelected = params.id === match._id
			if (isSelected) {
				this.index = index
				isPreviousSelected = false
			} else {
				if (this.index !== null) {
					isPreviousSelected = this.index + 1 === index
				} else {
					isPreviousSelected = false
				}
			}
		} else {
			isSelected = false
			isPreviousSelected = false
		}

		return (
			<Match
				key={match._id}
				match={match}
				style={style}
				firstVisible={firstVisible}
				goToChat={this.goToChat}
				isSelected={isSelected}
				isPreviousSelected={isPreviousSelected}
				index={index}
			/>
		)
	}

	render() {
		if (!this.props.loading) {
			return (
				<ScrollSync forceUpdater={this.forceUpdater}>
					{this.renderAutoSizer}
				</ScrollSync>
			)
		} else {
			return null
		}
	}

	handleUpdate = () => {
		this.props.refetch!()
	}

	handleBlock = (_event, args: { id: string }) => {
		const { params } = this.props.match
		if (params != null && params.id != null && args.id === params.id) {
			this.props.navigator!.goToMatches()
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
