import styled from 'styled-components'

const GenericIconWrapper = styled.span`
	width: 25px;
	${props => props.activated && 'cursor: pointer;'}
`

export default GenericIconWrapper
