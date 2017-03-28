import React, {Component} from 'react';
import HeaderContainer from '../HeaderContainer';
import Avatar from 'app/components/Avatar';
import {inject, observer} from 'mobx-react'
import styled from 'styled-components';
import muiThemeable from 'material-ui/styles/muiThemeable'


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

@inject('store')
@muiThemeable()
@observer
class ProfileHeader extends Component {
    render() {
        console.log(this.props.store.profile);
        
        return (
            <HeaderContainer>
                <StyledWrapper>
                    <Avatar match={{person: this.props.store.profile}} size={34}/>
                    <NameWrapper theme={this.props.muiTheme}>
                        {this.props.store.profile.name}
                    </NameWrapper>
                </StyledWrapper>
            </HeaderContainer>
        )
    }
}

export default ProfileHeader