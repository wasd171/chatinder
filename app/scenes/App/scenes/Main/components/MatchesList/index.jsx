import React, {Component} from 'react'
import {computed, reaction, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'
import Match from './components/Match'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import ScrollSync from 'react-virtualized/dist/commonjs/ScrollSync'
import styled from 'styled-components'
import {normalizeScrollbar} from 'app/styles'
import linkref from 'app/shims/linkref'
import SimpleBarStandalone from './components/SimpleBarStandalone'


const widthNum = 270;
const width = `${widthNum}px`;
const rowHeight = 63;

const MatchesListContainer = styled.div`
	min-width: ${width};
	width: ${width};
	max-width: ${width};
	max-height: 100%;
	height: 100%;
	box-sizing: border-box;
	user-select: none;
	padding-bottom: 10px;
`;

const ListWithScrollbar = normalizeScrollbar(List);
const ListWithoutScrollbar = styled(List)`
	&::-webkit-scrollbar {
		display: none
	}
`;


@inject('store')
@observer
class MatchesList extends Component {
	disposer;

	handleContentScroll = (handler, event) => {
		this.scrollbar.showScrollbar();
		handler(event);
	}

	handleMouseEnter = () => {
		this.scrollbar.showScrollbar();
	}

	renderAutoSizer = ({clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth}) => (
		<AutoSizer disableWidth={true}>
			{this.renderContent.bind(this, {onScroll, scrollTop, clientHeight, scrollHeight})}
		</AutoSizer>
	)

	renderContent = ({onScroll, scrollTop, clientHeight, scrollHeight}, {height}) => (
		<div onMouseEnter={this.handleMouseEnter}>
			<ListWithoutScrollbar
				height={height}
				width={widthNum}
				rowCount={this.props.store.sortedIds.length}
				rowHeight={rowHeight}
				rowRenderer={this.rowRenderer}
				innerRef={linkref(this, 'list')}
				sortBy={this.props.sortedIds}
				onScroll={this.handleContentScroll.bind(this, onScroll)}
				scrollTop={scrollTop}
				id="srcl"
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

	rowRenderer = ({index, key, style}) => {
		const matchId = this.props.store.sortedIds[index];
		const match = this.props.store.matches.get(matchId);
		const firstVisible = (index === 0);

		return (
			<Match
				key={matchId}
				match={match}
				style={style}
				height={rowHeight}
				width={widthNum}
				index={index}
				firstVisible={firstVisible}
			/>
		)
	}

	componentDidMount() {
		this.disposer = reaction(
			() => this.props.store.sortedIds,
			() => {
				this.list.forceUpdateGrid();
			}
		)
	}

	componentWillUnmount() {
		this.disposer();
		this.disposer = null;
	}

	render() {
		console.log('MatchesList');
		return (
			<MatchesListContainer>
				<ScrollSync>
					{this.renderAutoSizer}
				</ScrollSync>
			</MatchesListContainer>
		)
	}
	/*render() {
		return (
			<MatchesListContainer>
				<AutoSizer disableWidth={true}>
					{({height}) => (
						<div style={{position: 'relative'}} onScroll={() => console.log('scroll')}>
							<ListWithoutScrollbar
								height={height}
								width={widthNum}
								rowCount={this.props.store.sortedIds.length}
								rowHeight={rowHeight}
								rowRenderer={this.rowRenderer}
								innerRef={linkref(this, 'list')}
								sortBy={this.props.sortedIds}
								cellRangeRenderer={this.cellRangeRenderer}
							/>
							<div 
								ref={linkref(this, 'wrapper')} 
								style={{position: 'absolute', zIndex: 1, width: '100%', height: '100%', top: 0, left: 0, visibility: 'hidden'}}
							>
								<div style={{height: height*10}}></div>
							</div>
						</div>
					)}
				</AutoSizer>
			</MatchesListContainer>
		)
	}*/
}
/*function MatchesList({store}) {
	const computedRowRenderer = expr(() => {
		return function rowRenderer({index, key, style}) {
			const matchId = store.sortedIds[index];
			const match = store.matches.get(matchId);
			const firstVisible = (index === 0);

			return (
				<Match
					key={key}
					match={match}
					style={style}
					height={rowHeight}
					width={widthNum}
					index={index}
					firstVisible={firstVisible}
				/>
			)
		}
	});


	return (
		<MatchesListContainer>
			<AutoSizer disableWidth={true}>
				{({height}) => (
					<ListWithScrollbar
						height={height}
						width={widthNum}
						rowCount={store.sortedIds.length}
						rowHeight={rowHeight}
						rowRenderer={computedRowRenderer}
					/>
				)}
			</AutoSizer>
		</MatchesListContainer>
	)
}*/

export default MatchesList