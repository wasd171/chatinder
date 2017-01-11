import Inferno from 'inferno'
import {expr} from 'mobx'
import {observer} from 'inferno-mobx'
import Match from './components/Match'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import styled from 'styled-components'


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
`;


function MatchesList({store}) {
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
					<List
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
}

export default observer(['store'])(MatchesList)