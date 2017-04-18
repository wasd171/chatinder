import React, {Component} from 'react'
import Message from './components/Message'
import FirstMessage from './components/FirstMessage'
import NewDayMessage from './components/NewDayMessage'
import styled from 'styled-components'


const GenericMessageContainer = styled.div`
    overflow-anchor: auto;
`;

class GenericMessage extends Component {
    renderContent = () => {
        const {message, user, me, matchId} = this.props;

        if (message.first) {
            if (message.firstInNewDay) {
                return (
                    <NewDayMessage message={message}>
                        <FirstMessage user={user} me={me} matchId={matchId}>
                            <Message {...message}/>
                        </FirstMessage>
                    </NewDayMessage>
                )
            } else {
                return (
                    <FirstMessage user={user} me={me} matchId={matchId}>
                        <Message {...message}/>
                    </FirstMessage>
                )
            }
        } else {
            return (
                <Message {...message}/>
            )
        }
    }

    render() {
        return (
            <GenericMessageContainer style={this.props.style}>
                {this.renderContent()}
            </GenericMessageContainer>
        )
    }
}

export default GenericMessage