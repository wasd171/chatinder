import React, {Component} from 'react';
import HeaderContainer from '../HeaderContainer';
import Avatar from 'app/components/Avatar';
import {inject, observer} from 'mobx-react'
import styled from 'styled-components';
import muiThemeable from 'material-ui/styles/muiThemeable'
import {gql, graphql} from 'react-apollo'


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

const query = gql`
    query ProfileQuery {
        profile {
            smallPhoto
            name
        }
    }
`;

@inject('store')
@muiThemeable()
@graphql(query)
@observer
class ProfileHeader extends Component {
    renderLoading() {
        return 'Loading...'
    }

    renderContent(props) {
        console.log({props});
        return [
            <Avatar src={props.data.profile.smallPhoto} size={34} key='avatar'/>,
            <NameWrapper theme={props.muiTheme} key='name'>
                {props.data.profile.name}
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