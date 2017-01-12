import Inferno from 'inferno'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'


const OuterWrapper = styled.div`
	height: 46px;
	min-height: 46px;
	border-bottom: 1px solid ${props => props.theme.palette.borderColor};
	width: 100%;
`;

function HeaderContainer({muiTheme, children}) {
	return (
		<OuterWrapper theme={muiTheme}>
			{children}
		</OuterWrapper>
	)
}

export default muiThemeable()(HeaderContainer)