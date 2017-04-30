import React, {Component} from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import Avatar from 'app/components/Avatar'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 110px;
    padding: 5px;
`;

const NameSpan = styled.span`
    color: ${props => props.theme.palette.secondaryTextColor};
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    margin-top: 5px;
`;

@muiThemeable()
class CommonConnection extends Component {
    render() {
        return (
            <Container>
                <Avatar src={this.props.connection.photo.small} size={90}/>
                <NameSpan theme={this.props.muiTheme}>{this.props.connection.name}</NameSpan>
            </Container>
        )
    }
}

export default CommonConnection