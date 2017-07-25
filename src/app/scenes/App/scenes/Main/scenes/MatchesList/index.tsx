import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Match from './components/Match'
import { List, ListRowProps } from 'react-virtualized'
import styled from 'styled-components'
import { VIEW_PROFILE } from '~/shared/constants'
import { Navigator } from '~/app/stores/Navigator'
import { match } from 'react-router-dom'
import { StateType, MatchType } from '~/shared/definitions'
import SimpleBarRV, { IMergedProps } from '~/app/components/SimpleBarRV'
import { Location } from 'history'

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
	match: match<IRRProps>
	location: Location
}

export interface IInjectedProps extends IMatchesListProps {
	navigator: Navigator
	state: StateType
}

export interface IEventRV {
	scrollTop: number
	scrollHeight: number
	clientHeight: number
}

export type HandlerType = (event: IEventRV) => any

interface IForceUpdater {
	sortedMatches?: MatchType[]
	location?: Location
}

@inject('navigator', 'state')
@observer
class MatchesList extends React.Component<IMatchesListProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	_index: number | null = null
	_forceUpdater: IForceUpdater = {}

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
		const { location, sortedMatches } = this._forceUpdater
		if (
			this.injected.state.sortedMatches !== sortedMatches ||
			this.props.location !== location
		) {
			this._forceUpdater = {
				sortedMatches: this.injected.state.sortedMatches,
				location: this.props.location
			}
		}
		return this._forceUpdater
	}

	goToChat = ({ id, index }: { id: string; index: number }) => {
		this.index = index
		this.injected.navigator.goToChat(id)
	}

	renderContent = ({
		handleListScroll,
		scrollTop,
		height,
		width
	}: IMergedProps) =>
		<ListWithoutScrollbar
			height={height}
			width={width}
			rowCount={this.injected.state.sortedMatches.length}
			rowHeight={rowHeight}
			rowRenderer={this.rowRenderer}
			onScroll={handleListScroll}
			scrollTop={scrollTop}
			forceUpdater={this.forceUpdater}
		/>

	rowRenderer = ({ index, style }: ListRowProps) => {
		const match = this.injected.state.sortedMatches[index]
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
		return (
			<SimpleBarRV forceUpdater={this.forceUpdater} simple={false}>
				{this.renderContent}
			</SimpleBarRV>
		)
	}

	handleBlock = (_event: Electron.Event, args: { id: string }) => {
		const { params } = this.props.match
		if (params != null && params.id != null && args.id === params.id) {
			this.injected.navigator.goToMatches()
		}
	}
}

export default MatchesList
