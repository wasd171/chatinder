import styled from 'styled-components'

const GenericNameSpan = styled.span`
	color: ${props => props.theme.palette.textColor};
	cursor: ${props => (props.clickable ? 'pointer' : 'default')};
`

export default GenericNameSpan
