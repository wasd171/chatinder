import React, {Component} from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'


const OuterWrapper = styled.div`
	height: 46px;
	min-height: 46px;
	border-bottom: 1px solid ${props => props.theme.palette.borderColor};
	width: 100%;
`;

@muiThemeable()
class HeaderContainer extends Component {
	render() {
		return (
			<OuterWrapper theme={this.props.muiTheme}>
				{this.props.children}
			</OuterWrapper>
		)
	}
}

export default HeaderContainer
