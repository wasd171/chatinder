import Inferno from 'inferno'
import Component from 'inferno-component'
import {observer} from 'inferno-mobx'
import {action, observable, computed, reaction} from 'mobx'
import Promise from 'bluebird'
import forEach from 'lodash/forEach'
import MessagesGroup from './components/MessagesGroup'
import linkref from 'linkref'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import {normalizeScrollbar} from 'app/styles'


const OuterWrapper = styled.div`
	height: 100%;
	max-height: 100%;
	overflow-y: scroll;
	position: relative;
	padding-bottom: 10px;
	will-change: transform;
`;

const OuterWrapperWithScrollbar = normalizeScrollbar(OuterWrapper);

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	min-height: 100%;
`;

class MessagesList extends Component {
	disposer;
	shouldScrollBottom;
	forceScrollBottom = false;
	shouldRestoreScrollPosition;
	nodeScrollTop;
	nodeScrollHeight;
	@observable initialRender = true;
	@observable startingFrom = 0;

	@action setRenderFlag = (flag) => {
		this.initialRender = flag
	};

	@action setStartingFrom = ({initial}) => {
		const length = this.messageGroups.length;
		const startingIndex = initial ? length : this.startingFrom;
		if (startingIndex === 0) {
			return
		}
		let newIndex = startingIndex - 17;
		newIndex = (newIndex < 0) ? 0 : newIndex;

		if (!initial) {
			const {scrollTop, scrollHeight} = this.refs.container;
			this.nodeScrollTop = scrollTop;
			this.nodeScrollHeight = scrollHeight;
			this.shouldRestoreScrollPosition = true;
		} else if (!this.initialRender) {
			this.forceScrollBottom = true;
			this.shouldRestoreScrollPosition = false;
		}
		this.startingFrom = newIndex;
	};

	@computed get matchId() {
		return this.props.store.currentView.params.matchId
	}

	@computed get currentMatch() {
		return this.props.store.matches.get(this.matchId)
	}

	@computed get rawMessages() {
		return this.currentMatch.messages
	}

	@computed get messageGroups() {
		let messageGroups = [];
		let tempGroup = [];

		forEach(this.rawMessages, message => {
			if (tempGroup.length !== 0) {
				if (tempGroup[0].messageGroup === message.messageGroup) {
					tempGroup.push(message)
				} else {
					messageGroups.push(tempGroup);
					tempGroup = [message];
				}
			} else {
				tempGroup.push(message)
			}
		});
		messageGroups.push(tempGroup);

		return messageGroups
	}

	@computed get filteredMessages() {
		if (this.messageGroups[0].length === 0) {
			return null
		} else {
			return this.messageGroups.slice(this.startingFrom)
		}
	}

	@computed get messageNodes() {
		if (!!this.filteredMessages) {
			return this.filteredMessages.map(messagesGroup => {
				return (
					<MessagesGroup
						messagesGroup={messagesGroup}
						currentMatch={this.currentMatch}
						key={messagesGroup[0].messageGroup}
					/>
				)
			});
		} else {
			return null
		}
	}

	showMoreMessages = () => {
		if (!this.initialRender) {
			this.setStartingFrom({initial: false});
		}
	};

	scrollToBottom = () => {
		this.refs.container.scrollTop = this.refs.container.scrollHeight
	};

	constructor(props) {
		super(props);
		this.setStartingFrom({initial: true});
	}

	async componentDidMount() {
		await Promise.delay(10);
		this.scrollToBottom();
		this.setRenderFlag(false);

		this.disposer = reaction(
			() => this.matchId,
			() => {
				this.setStartingFrom({initial: true});
			}
		);
	}

	componentWillUpdate() {
		const node = this.refs.container;
		this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	}

	componentDidUpdate() {
		const node = this.refs.container;
		console.log({shouldScrollBottom: this.shouldScrollBottom, forceScrollBottom: this.forceScrollBottom});
		if (this.shouldScrollBottom || this.forceScrollBottom) {
			this.shouldScrollBottom = false;
			this.forceScrollBottom = false;
			this.scrollToBottom();
		} else if (this.shouldRestoreScrollPosition) {
			node.scrollTop = node.scrollHeight - this.nodeScrollHeight + this.nodeScrollTop;
		}
	}

	componentWillUnmount() {
		this.disposer();
		this.disposer = null;
	}

	render() {
		let nodes = this.messageNodes ? this.messageNodes : [];

		return (
			<OuterWrapperWithScrollbar innerRef={linkref(this, 'container')}>
				<Waypoint onEnter={this.showMoreMessages}/>
				<InnerWrapper hasKeyedChildren>
					{nodes}
				</InnerWrapper>
			</OuterWrapperWithScrollbar>
		)
	}
}

export default observer(['store'])(MessagesList)