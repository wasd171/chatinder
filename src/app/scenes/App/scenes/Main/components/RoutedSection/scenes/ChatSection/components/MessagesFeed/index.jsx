import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {graphql} from 'react-apollo'
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollSync} from 'react-virtualized'
import GenericMessage from './components/GenericMessage'
import SimpleBarStandalone from '~/app/components/SimpleBarStandalone'
import styled from 'styled-components'
import linkref from '~/app/shims/linkref'
import {ipcRenderer} from 'electron'
import {SUBSCRIPTION_MATCH} from '~/shared/constants'
import query from './query.graphql'
import update from 'immutability-helper'


const Container = styled.div`
    height: 100%;
    width: 100%;
`;

const MessagesList = styled(List)`
	overflow-anchor: auto;
	&::-webkit-scrollbar {
		display: none
	}
`;

@graphql(query)
class MessagesFeed extends Component {
    list;
	scrollbar;
	scrollHandler;
	sizes = {};
	
    customScrollHandler = (event) => {
    	this.sizes = event;
    	this.scrollHandler(event);
    }
    
	handleListScroll = (event) => {
		this.scrollbar.showScrollbar();
		this.customScrollHandler(event);
	}
	
	handleScrollbarScroll = (event) => {
		this.customScrollHandler(event);
	}

	handleMouseEnter = () => {
		this.scrollbar.showScrollbar();
	}

    getCache = (width) => {
        return this.props.caches.getMessagesCache(this.props.id, width);
    }
    
    get scrollToIndex() {
        const end = this.props.data.match.messages.length - 1;
        const savePosition = undefined;

        if (typeof this.sizes.clientHeight === 'undefined' || this.sizes.clientHeight === 0) {
            return end
        } else {
            if (this.sizes.clientHeight + this.sizes.scrollTop === this.sizes.scrollHeight) {
                return end
            } else {
                return savePosition
            }
        }
    }

    getOverscanRowCount = (width) => {
    	const {id, data} = this.props;
    	const maxLength = data.match.messages.length;
    	const cacheLength = Object.keys(this.getCache(width)._rowHeightCache).length;
    	
    	if (!this.props.caches.getShouldMeasureEverything(id, width)) {
    		if (cacheLength === maxLength) {
			    this.props.caches.forbidMeasureEverything(id, width);
                return 10;
		    }
		    return maxLength;
	    } else {
    		return Math.max(maxLength - cacheLength, 10);
	    }
    }
    
    get forceUpdateGetter() {
		// Method for triggering updates in PureComponent
        return this.props.data.match.messages
    }
    
    renderChildren = (props) => {
	    return (
	    	<ScrollSync forceUpdate={this.forceUpdateGetter}>
		        {this.renderMessages.bind(this, props)}
	        </ScrollSync>
	    )
    }
	
	rowRenderer = ({cache}, {index, parent, style}) => {
		const message = this.props.data.match.messages[index];
		const me = !(message.from === this.props.data.match.person._id);
		const user = me ? this.props.data.profile.user : this.props.data.match.person;
		
		return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={message._id}
                parent={parent}
                rowIndex={index}
            >
                <GenericMessage message={message} user={user} me={me} style={style} matchId={this.props.data.match._id}/>
            </CellMeasurer>
		)
	}
    
    renderMessages = ({height, width}, {onScroll, scrollHeight, scrollTop}) => {
		this.scrollHandler = onScroll;
        const cache = this.getCache(width);
        const overscanRowCount = this.getOverscanRowCount(width);
		
		return (
		    <div onMouseEnter={this.handleMouseEnter}>
			    <MessagesList
				    width={width}
				    height={height}
				    rowCount={this.props.data.match.messages.length}
				    rowRenderer={this.rowRenderer.bind(this, {cache})}
				    rowHeight={cache.rowHeight}
				    deferredMeasurementCache={cache}
				    onScroll={this.handleListScroll}
				    scrollTop={scrollTop}
				    innerRef={linkref(this, 'list')}
				    scrollToIndex={this.scrollToIndex}
				    forceUpdate={this.forceUpdateGetter}
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
        if (this.props.data.loading || typeof this.props.data.match === 'undefined') {
            return <span>Loading...</span>
        } else {
            return (
                <AutoSizer forceUpdate={this.forceUpdateGetter}>
                    {this.renderChildren}
                </AutoSizer>
            )
        }
    }
    
    handleUpdate = (event, args) => {
        if (args.id === this.props.id) {
            this.props.data.refetch();
        }
    }

    componentDidMount() {
        ipcRenderer.on(SUBSCRIPTION_MATCH, this.handleUpdate);
        // this.props.data.refetch();
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(SUBSCRIPTION_MATCH, this.handleUpdate);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.sizes = {};
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id && !this.props.data.loading) {
            this.props.data.refetch();
        }
    }

    shouldComponentUpdate(nextProps) {
        return !(typeof nextProps.data.match === 'undefined')
    }
}

@inject('view', 'caches')
@observer
class MessagesFeedMobX extends Component {
    render() {
        return (
            <Container>
                <MessagesFeed id={this.props.view.params.id} caches={this.props.caches}/>
            </Container>
        )
    }
}

export default MessagesFeedMobX