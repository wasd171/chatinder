import styled from 'styled-components'

export interface IGenericIconWrapperProps {
	activated?: boolean
}

const GenericIconWrapper = styled.span`
	width: 25px;
	${(props: IGenericIconWrapperProps) =>
		props.activated ? 'cursor: pointer;' : ''};
`

export default GenericIconWrapper
