import Component from 'inferno-component'
import {computed} from 'mobx'
import {observer} from 'inferno-mobx'
import muiThemeable from 'material-ui/styles/muiThemeable'
import compose from 'recompose/compose'
import styled from 'styled-components'
import isToday from 'date-fns/is_today'
import isYesterday from 'date-fns/is_yesterday'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DateBanner = styled.div`
    margin: auto;
    margin-top: 10px;
    padding-left: 11px;
`;

const DateWrapper = styled.div`
    font-size: 14px;
    padding: 5px 10px;
    color: ${props => props.theme.palette.secondaryTextColor};
`;

class DateGroup extends Component {
    @computed get formattedDay() {
        // For auto-recalc
        const {store, day, timestamp} = this.props;
        store.time;
        // console.log('formattedDay', day);

        if (isToday(timestamp)) {
            return 'Today'
        } else if (isYesterday(timestamp)) {
            return 'Yesterday'
        } else {
            return day;
        }
    }

    render() {
        console.log('render', this.formattedDay, this.props.day);
        return (
            <Wrapper hasKeyedChildren>
                <DateBanner key={`banner-${this.props.timestamp}`}>
                    <DateWrapper theme={this.props.muiTheme}>
                        {this.formattedDay}
                    </DateWrapper>
                </DateBanner>
                {this.props.children}
            </Wrapper>
        )
    }
}
/*function DateGroup({children, muiTheme, timestamp}) {
    return (
        <Wrapper hasKeyedChildren>
            <DateBanner theme={muiTheme}>{timestamp}</DateBanner>
            {children}
        </Wrapper>
    )
}*/

export default compose(
    muiThemeable(),
    observer(['store'])
)(DateGroup)