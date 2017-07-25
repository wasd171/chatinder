import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {
	CellMeasurer,
	List,
	CellMeasurerCache,
	OnScrollParams,
	ListRowProps
} from 'react-virtualized'
import GenericMessage from './components/GenericMessage'
import styled from 'styled-components'
import NoMessages from './components/NoMessages'
import { Caches } from '~/app/stores/Caches'
import { Navigator } from '~/app/stores/Navigator'
import { StateType, MessageType } from '~/shared/definitions'
import SimpleBarRV, { IMergedProps } from '~/app/components/SimpleBarRV'
import { getSnapshot } from 'mobx-state-tree'

const MessagesList = styled(List)`
	overflow-anchor: auto;
	&::-webkit-scrollbar {
		display: none
	}
`

interface ICacheProp {
	cache: CellMeasurerCache
}

export interface IMessagesFeedProps {
	id: string
}

export interface IInjectedProps extends IMessagesFeedProps {
	caches: Caches
	navigator: Navigator
	state: StateType
}

interface ISizes {
	clientHeight?: number
	scrollHeight?: number
	scrollTop?: number
}

type RendererProps = ICacheProp & ListRowProps

@inject('caches', 'navigator', 'state')
@observer
class MessagesFeed extends React.Component<IMessagesFeedProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	sizes: ISizes = {}

	handleScroll = (event: OnScrollParams) => {
		this.sizes = event
	}

	getCache = (width: number) => {
		return this.injected.caches.getMessagesCache(this.props.id, width)
	}

	get match() {
		return this.injected.state.matches.get(this.props.id)!
	}

	get scrollToIndex() {
		const end = this.match.messages.length - 1
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
		const { id } = this.props
		const maxLength = this.match.messages.length
		const cacheLength = Object.keys(this.getCache(width)._rowHeightCache)
			.length

		if (!this.injected.caches.getShouldMeasureEverything(id, width)) {
			if (cacheLength === maxLength) {
				this.injected.caches.forbidMeasureEverything(id, width)
				return 10
			}
			return maxLength
		} else {
			return Math.max(maxLength - cacheLength, 10)
		}
	}

	get forceUpdaterGetter() {
		// Method for triggering updates in PureComponent
		return getSnapshot(this.match.messages)
	}

	rowRenderer = ({ cache, index, parent, style }: RendererProps) => {
		const message: MessageType = this.match.messages[index]
		const me = !(message.from === this.match.person._id)
		const user = me ? this.injected.state.defaults!.user : this.match.person

		return (
			<CellMeasurer
				cache={cache}
				columnIndex={0}
				key={message._id}
				parent={parent as any}
				rowIndex={index}
			>
				<GenericMessage
					message={message}
					user={user}
					me={me}
					style={style}
					matchId={this.match._id}
				/>
			</CellMeasurer>
		)
	}

	renderMessages = (props: IMergedProps): JSX.Element => {
		const { height, width, handleListScroll, scrollTop } = props
		const cache = this.getCache(width)
		const overscanRowCount = this.getOverscanRowCount(width)

		return (
			<MessagesList
				width={width}
				height={height}
				rowCount={this.match.messages.length}
				rowRenderer={(props: ListRowProps) =>
					this.rowRenderer({ ...props, cache })}
				rowHeight={cache.rowHeight}
				deferredMeasurementCache={cache}
				onScroll={handleListScroll}
				scrollTop={scrollTop}
				scrollToIndex={this.scrollToIndex}
				forceUpdater={this.forceUpdaterGetter}
				overscanRowCount={overscanRowCount}
			/>
		)
	}

	renderNoMessages = () => <NoMessages />

	render() {
		const isEmpty = this.match.messages.length === 0
		return (
			<SimpleBarRV
				forceUpdater={this.forceUpdaterGetter}
				onScroll={this.handleScroll}
				simple={isEmpty}
			>
				{isEmpty ? this.renderNoMessages : this.renderMessages}
			</SimpleBarRV>
		)
	}

	componentWillReceiveProps(nextProps: IMessagesFeedProps) {
		if (nextProps.id !== this.props.id) {
			this.sizes = {}
		}
	}
}

export default MessagesFeed
