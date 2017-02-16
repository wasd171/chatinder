import Component from 'inferno-component'
import {computed, reaction} from 'mobx'
import {observer} from 'inferno-mobx'
import Match from './components/Match'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import styled from 'styled-components'
import {normalizeScrollbar} from 'app/styles'
import linkref from 'linkref'


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


class MatchesList extends Component {
	disposer;

	rowRenderer = ({index, key, style}) => {
		const matchId = this.props.store.sortedIds[index];
		const match = this.props.store.matches.get(matchId);
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

	componentDidMount() {
		this.disposer = reaction(
			() => this.props.store.sortedIds,
			() => {
				console.log('sortedIds have changed');
				this.refs.list.forceUpdateGrid();
			}
		)
	}

	componentWillUnmount() {
		this.disposer();
		this.disposer = null;
	}

	render() {
		return (
			<MatchesListContainer>
				<AutoSizer disableWidth={true}>
					{({height}) => (
						<ListWithScrollbar
							height={height}
							width={widthNum}
							rowCount={this.props.store.sortedIds.length}
							rowHeight={rowHeight}
							rowRenderer={this.rowRenderer}
							innerRef={linkref(this, 'list')}
						/>
					)}
				</AutoSizer>
			</MatchesListContainer>
		)
	}
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

export default observer(['store'])(MatchesList)