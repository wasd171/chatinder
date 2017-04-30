import React, {Component} from 'react'
import linkref from 'app/shims/linkref'
import Simplebar from 'simplebar'
import styled from 'styled-components'


const Wrapper = styled.div`
    height: 100%;
	max-width: 100%;
`;

class SimpleBarWrapper extends Component {
    simplebar;
    root;

    componentDidMount() {
        this.simplebar = new Simplebar(this.root, {wrapContent: false, forceEnabled: true});
    }

    componentWillUnmount() {
        this.simplebar.unMount();
    }

    render() {
        return (
            <Wrapper innerRef={linkref(this, 'root')}>
                <div className='simplebar-scroll-content'>
                    <div className='simplebar-content'>
                        {this.props.children}
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default SimpleBarWrapper