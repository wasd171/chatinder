import React, {Component} from 'react'
import styled from 'styled-components'
import {CircularProgress} from 'material-ui'


const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

class LoadingStub extends Component {
    render() {
        return (
            <Container>
                <CircularProgress size={this.props.size}/>
            </Container>
        )
    }
}

export default LoadingStub