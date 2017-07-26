import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import * as isToday from 'date-fns/is_today'
import * as isYesterday from 'date-fns/is_yesterday'
import { MuiTheme } from 'material-ui/styles'
import { Time } from '~/app/stores/Time'

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

export interface INewDayMessageProps {
	message: {
		sentDate: string
		sentDay: string
	}
}

interface IInjectedProps extends INewDayMessageProps {
	muiTheme: MuiTheme
	time: Time
}

@inject('time')
@muiThemeable()
@observer
class NewDayMessage extends React.Component<INewDayMessageProps> {
	get injected() {
		return this.props as IInjectedProps
	}

	@computed
	get formattedDay() {
		// For auto-recalc
		const { message } = this.props
		this.injected.time.now
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
					<DateWrapper theme={this.injected.muiTheme}>
						{this.formattedDay}
					</DateWrapper>
				</DateBanner>
				{this.props.children}
			</Wrapper>
		)
	}
}

export default NewDayMessage
