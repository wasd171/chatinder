import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import isToday from 'date-fns/is_today'
import isYesterday from 'date-fns/is_yesterday'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
`

const DateBanner = styled.div`
    margin: auto;
    margin-top: 10px;
`

const DateWrapper = styled.div`
    font-size: 14px;
    padding: 5px 10px;
    color: ${props => props.theme.palette.secondaryTextColor};
	cursor: default;
`

@inject('time')
@muiThemeable()
@observer
class NewDayMessage extends Component {
	@computed get formattedDay() {
		// For auto-recalc
		const { time, message } = this.props
		time.now
		if (isToday(message.sentDate)) {
			return 'Today'
		} else if (isYesterday(message.sentDate)) {
			return 'Yesterday'
		} else {
			return message.sentDay
		}
	}

	render() {
		return (
			<Wrapper>
				<DateBanner>
					<DateWrapper theme={this.props.muiTheme}>
						{this.formattedDay}
					</DateWrapper>
				</DateBanner>
				{this.props.children}
			</Wrapper>
		)
	}
}

export default NewDayMessage
