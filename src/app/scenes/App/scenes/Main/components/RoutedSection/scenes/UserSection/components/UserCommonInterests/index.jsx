import React, {Component} from 'react'
import styled from 'styled-components'
import CommonInterest from './components/CommonInterest'
import muiThemeable from 'material-ui/styles/muiThemeable'


const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InterestsCount = styled.span`
    color: ${props => props.theme.palette.textColor};
    margin-bottom: 15px;
`;

const InterestsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

@muiThemeable()
class UserCommonInterests extends Component {
    renderInterest(interest) {
        return <CommonInterest interest={interest} key={interest.id}/>
    }

    render() {
        const {muiTheme, commonInterests} = this.props;

        return (
            <ContentContainer>
                <InterestsCount theme={muiTheme}>
                    Common interests: {commonInterests.length}
                </InterestsCount>
                <InterestsContainer>
                    {commonInterests.map(this.renderInterest)}
                </InterestsContainer>
            </ContentContainer>
        )
    }
}

export default UserCommonInterests