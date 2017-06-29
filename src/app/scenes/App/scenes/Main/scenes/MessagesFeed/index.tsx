import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { graphql, DefaultChildProps } from 'react-apollo'
import {
	AutoSizer,
	CellMeasurer,
	List,
	ScrollSync,
	CellMeasurerCache,
	OnScrollParams
} from 'react-virtualized'
import GenericMessage from './components/GenericMessage'
import SimpleBarStandalone from 'app/components/SimpleBarStandalone'
import styled from 'styled-components'
import linkref, { ILinkedRefs } from 'app/shims/linkref'
import { ipcRenderer } from 'electron'
import { SUBSCRIPTION_MATCH } from 'shared/constants'
import * as query from './query.graphql'
import LoadingStub from 'app/components/LoadingStub'
import NoMessages from './components/NoMessages'
import { Caches } from 'app/stores/Caches'
import { Navigator } from 'app/stores/Navigator'

const Container = styled.div`
	height: 100%;
	width: 100%;
`

const MessagesList = styled(List)`
	overflow-anchor: auto;
	&::-webkit-scrollbar {
		display: none
	}
`

interface ICacheProp {
	cache: CellMeasurerCache
}

interface IMessagesFeedProps {
	caches?: Caches
	navigator?: Navigator
	id: string
}

interface IGQLMessage {
	_id: string
	from: string
	first: boolean
	firstInNewDay: boolean
	sentDay: string
	sentTime: string
	sentDate: string
	formattedMessage: string
	status: string
	isGIPHY: boolean
	message: boolean
}

interface IGQLRes {
	match: {
		_id: string
		person: {
			_id: string
			name: string
			smallPhoto: string
		}
		messages: Array<IGQLMessage>
	}
	profile: {
		user: {
			_id: string
			name: string
			smallPhoto: string
		}
	}
}

export type MessagesFeedPropsType = DefaultChildProps<
	IMessagesFeedProps,
	IGQLRes
>

@inject('caches', 'navigator')
@graphql(query)
@observer
class MessagesFeed extends React.Component<MessagesFeedPropsType> {
	_linkedRefs: ILinkedRefs
	scrollbar: SimpleBarStandalone
	scrollHandler: (params: OnScrollParams) => any
	sizes: {
		clientHeight?: number
		scrollHeight?: number
		scrollTop?: number
	} = {}

	customScrollHandler = (event: OnScrollParams) => {
		this.sizes = event
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

	getCache = (width: number) => {
		return this.props.caches!.getMessagesCache(this.props.id, width)
	}

	get scrollToIndex() {
		const end = this.props.data!.match.messages.length - 1
		const savePosition = undefined
		const { clientHeight, scrollTop, scrollHeight } = this.sizes

		if (
			typeof clientHeight === 'undefined' ||
			this.sizes.clientHeight === 0
		) {
			return end
		} else {
			if (
				typeof scrollTop !== 'undefined' &&
				typeof scrollHeight !== 'undefined' &&
				clientHeight + scrollTop === scrollHeight
			) {
				return end
			} else {
				return savePosition
			}
		}
	}

	getOverscanRowCount = (width: number) => {
		const { id, data } = this.props
		const maxLength = data!.match.messages.length
		const cacheLength = Object.keys(this.getCache(width)._rowHeightCache)
			.length

		if (!this.props.caches!.getShouldMeasureEverything(id, width)) {
			if (cacheLength === maxLength) {
				this.props.caches!.forbidMeasureEverything(id, width)
				return 10
			}
			return maxLength
		} else {
			return Math.max(maxLength - cacheLength, 10)
		}
	}

	get forceUpdaterGetter() {
		// Method for triggering updates in PureComponent
		return this.props.data!.match.messages
	}

	renderChildren = (props: ICacheProp) => {
		return (
			<ScrollSync forceUpdater={this.forceUpdaterGetter}>
				{this.renderMessages.bind(this, props)}
			</ScrollSync>
		)
	}

	rowRenderer = (
		{ cache }: ICacheProp,
		{
			index,
			parent,
			style
		}: { index: number; style: Object; parent: React.ReactType }
	) => {
		const message = this.props.data!.match.messages[index]
		const me = !(message.from === this.props.data!.match.person._id)
		const user = me
			? this.props.data!.profile.user
			: this.props.data!.match.person

		return (
			<CellMeasurer
				cache={cache}
				columnIndex={0}
				key={message._id}
				parent={parent}
				rowIndex={index}
			>
				<GenericMessage
					message={message}
					user={user}
					me={me}
					style={style}
					matchId={this.props.data!.match._id}
				/>
			</CellMeasurer>
		)
	}

	renderMessages = (
		{ height, width }: { height: number; width: number },
		{
			onScroll,
			scrollHeight,
			scrollTop
		}: {
			scrollHeight: number
			scrollTop: number
			onScroll: (params: OnScrollParams) => any
		}
	) => {
		this.scrollHandler = onScroll
		const cache = this.getCache(width)
		const overscanRowCount = this.getOverscanRowCount(width)

		return (
			<div onMouseEnter={this.handleMouseEnter}>
				<MessagesList
					width={width}
					height={height}
					rowCount={this.props.data!.match.messages.length}
					rowRenderer={this.rowRenderer.bind(this, { cache })}
					rowHeight={cache.rowHeight}
					deferredMeasurementCache={cache}
					onScroll={this.handleListScroll}
					scrollTop={scrollTop}
					innerRef={linkref(this, 'list')}
					scrollToIndex={this.scrollToIndex}
					forceUpdater={this.forceUpdaterGetter}
					overscanRowCount={overscanRowCount}
				/>
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

	render() {
		let content

		if (
			this.props.data!.loading ||
			typeof this.props.data!.match === 'undefined'
		) {
			content = <LoadingStub size={40} />
		} else if (this.props.data!.match.messages.length === 0) {
			content = <NoMessages />
		} else {
			content = (
				<AutoSizer forceUpdater={this.forceUpdaterGetter}>
					{this.renderChildren}
				</AutoSizer>
			)
		}

		return (
			<Container>
				{content}
			</Container>
		)
	}

	handleUpdate = (_event, args: { id: string }) => {
		if (args.id === this.props.id) {
			this.props.data!.refetch()
		}
	}

	componentDidMount() {
		ipcRenderer.on(SUBSCRIPTION_MATCH, this.handleUpdate)
	}

	componentWillUnmount() {
		ipcRenderer.removeListener(SUBSCRIPTION_MATCH, this.handleUpdate)
	}

	componentWillReceiveProps(nextProps: MessagesFeedPropsType) {
		if (nextProps.id !== this.props.id) {
			this.sizes = {}
		}
	}

	componentDidUpdate(prevProps: MessagesFeedPropsType) {
		if (prevProps.id !== this.props.id && !this.props.data!.loading) {
			this.props.data!.refetch()
		}
	}

	shouldComponentUpdate(nextProps: MessagesFeedPropsType) {
		return !(typeof nextProps.data!.match === 'undefined')
	}
}

export default MessagesFeed
