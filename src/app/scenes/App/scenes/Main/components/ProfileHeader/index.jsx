import React, {Component} from 'react'
import HeaderContainer from '~/app/components/HeaderContainer'
import Avatar from '~/app/components/Avatar'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {graphql} from 'react-apollo'
import profileQuery from './query.graphql'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    padding-left: 12px;
`;

const NameWrapper = styled.span`
    margin-left: 12px;
    cursor: pointer;
    font-weight: 400;
    color: ${props => props.theme.palette.textColor}
`;

@muiThemeable()
@graphql(profileQuery)
class ProfileHeader extends Component {
    renderLoading() {
        return 'Loading...'
    }

    renderContent(props) {
        const {name, smallPhoto} = props.data.profile;
        return [
            <Avatar src={smallPhoto} size={34} key='avatar'/>,
            <NameWrapper theme={props.muiTheme} key='name'>
                {name}
            </NameWrapper>
        ]
    }

    render() {       
        return (
            <HeaderContainer>
                <StyledWrapper>
                    {this.props.data.loading ? this.renderLoading() : this.renderContent(this.props)}
                </StyledWrapper>
            </HeaderContainer>
        )
    }
}

export default ProfileHeader