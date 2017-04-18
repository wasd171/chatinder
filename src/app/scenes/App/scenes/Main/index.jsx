import React, {Component} from 'react'
import NoMatches from './components/NoMatches'
import ProfileHeader from './components/ProfileHeader';
import MatchesList from './components/MatchesList'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import {gql, graphql} from 'react-apollo'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import RoutedSection from './components/RoutedSection'


const checkDoMatchesExist = gql`
	mutation checkDoMatchesExistAndFetchHistory {
		checkDoMatchesExist
	}
`;

const startSubscription = gql`
	mutation startSubscription {
		subscribeToUpdates {
			status
		}
	}
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	height: 100vh;
	max-height: 100vh;
	min-height: 100vh;
`;

function BaseSection(el) {
	return (
		el`
			height: 100vh;
			max-height: 100vh;
			position: relative;
			display: flex;
			flex-direction: column;
			overflow-x: hidden;
			&::-webkit-scrollbar {
				display: none;
			}
		`
	)
}

const MatchesSection = styled(BaseSection(styled.aside))`
	background-color: ${props => props.theme.palette.canvasColor}
	border-right: 1px solid ${props => props.theme.palette.borderColor};
	width: 270px;
	min-width: 270px;
`;

@graphql(checkDoMatchesExist, {name: 'check'})
@graphql(startSubscription, {name: 'subscribe'})
@muiThemeable()
@observer
class Main extends Component {
	@observable shouldShowContent = undefined;

	@action changeStatus = (status) => {
		this.shouldShowContent = status;
	}

	async componentDidMount() {
		const status = await this.props.check();
		if (status) {
			this.props.subscribe();
		}
		this.changeStatus(status);
	}

	renderChildren = () => {
		const {muiTheme} = this.props;
		
		if (typeof this.shouldShowContent === 'undefined') {
			return <span>Loading...</span>
		}

		if (!this.shouldShowContent) {
			return <NoMatches/>
		} else {
			return [
				<MatchesSection theme={muiTheme} key="matches">
					<ProfileHeader/>
					<MatchesList/>
				</MatchesSection>,
				<RoutedSection key="routed"/>
			]
		}
	}

	render() {
		return (
			<MainContainer theme={this.props.muiTheme}>
				{this.renderChildren()}
			</MainContainer>
		)
	}
}

export default Main