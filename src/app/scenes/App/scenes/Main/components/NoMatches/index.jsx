import React, {Component} from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import {RaisedButton} from 'material-ui'
import {gql, graphql} from 'react-apollo'


const logoutMutation = gql`
    mutation logout {
        logout {
            status
        }
    }
`;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h3`
    color: ${props => props.theme.palette.textColor}
`;

const Message = styled.p`
    color: ${props => props.primary ? props.theme.palette.textColor : props.theme.palette.secondaryTextColor}
`;

@graphql(logoutMutation)
@muiThemeable()
class NoMatches extends Component {
    render() {
        const {muiTheme, mutate} = this.props;
        return (
            <Wrapper>
                <Title theme={muiTheme}>
                    Looks like you don't have any matches yet! =(
                </Title>
                <Message theme={muiTheme} primary={true}>
                    This app is for chatting purposes only. Use an official Tinder app on your phone to find your soulmates
                </Message>
                <Message theme={muiTheme}>
                    You can also log out and try another Tinder profile
                </Message>
                <RaisedButton 
                    label="Log out" 
                    labelColor={muiTheme.palette.primary1Color}
                    onTouchTap={mutate}
                />
            </Wrapper>
        )
    }
}

export default NoMatches