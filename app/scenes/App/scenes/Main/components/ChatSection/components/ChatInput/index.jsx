import React, {Component} from 'react'
import {observable, action, computed} from 'mobx'
import TextField from './components/TextField'
import SendButton from './components/SendButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import transitions from 'material-ui/styles/transitions'
import {inject, observer} from 'mobx-react'
import styled from 'styled-components'
import trim from 'lodash/trim'

const padding = 10;

const OuterWrapper = styled.div`
	border-top: 1px solid ${props => props.theme.palette.borderColor};
	padding-left: ${padding}px;
	padding-right: ${padding}px;
	transition: ${transitions.easeOut('200ms', 'height')};
	display: inline-block;
	max-width: 100%;
	width: 100%;
	posititon: relative;
`;

const MiddleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
	max-width: 100%;
	width: 100%;
`;

@inject('store')
@muiThemeable()
@observer
class ChatInput extends Component {
	@observable value  = '';

	@computed get hasValue() {
		return !!this.isValid(this.value)
	}

	@action handleChange = (text) => {
		this.value = text;
	};

	@action handleSubmit = () => {
		console.log('Submit handler');
		if (this.hasValue) {
			const {view, tinder, api} = this.props.store;
			const currentMatch = tinder.matches.get(view.currentView.params.matchId);
			api.sendMessage(currentMatch['_id'], trim(this.value));
			this.value = '';
		}
	};

	isValid(value) {
		const normValue = trim(value);
		return normValue !== '' && normValue !== undefined && normValue !== null;
	}


	render() {
		return (
			<OuterWrapper height={this.height} theme={this.props.muiTheme}>
				<MiddleWrapper>
					<TextField
						fullWidth={true}
						value={this.value}
						hintText='Message'
						rows={this.rows}
						maxRows={this.maxRows}
						multiLine={true}
						onChange={this.handleChange}
						hasValue={this.hasValue}
						onSubmit={this.handleSubmit}
					/>
					<SendButton disabled={!this.hasValue} onClick={this.handleSubmit}/>
				</MiddleWrapper>
			</OuterWrapper>
		);
	}
}

export default ChatInput