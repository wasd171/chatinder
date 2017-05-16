import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import BaseSection from 'app/components/BaseSection'
import styled from 'styled-components'

const MainSectionWrapper = styled(BaseSection(styled.main))`
	background-color: ${props => props.theme.palette.canvasColor}
	width: 100%;
	overflow: hidden;
`

@muiThemeable()
class MainSection extends Component {
	render() {
		return (
			<MainSectionWrapper theme={this.props.muiTheme}>
				{this.props.children}
			</MainSectionWrapper>
		)
	}
}

export default MainSection
