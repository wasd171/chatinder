import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import ChatHeader from './ChatHeader'


@inject('view')
@observer
class ChatHeaderMobX extends Component {
    render() {
        return <ChatHeader id={this.props.view.params.id}/>
    }
}

export default ChatHeaderMobX