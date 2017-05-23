import styled from 'styled-components'

const GenericIconWrapper = styled.span`
	width: 17px;
	${props => props.activated && 'cursor: pointer;'}
`

export default GenericIconWrapper
