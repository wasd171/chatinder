import styled from 'styled-components'

const GenericHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${props => (props.center ? 'center' : 'space-between')};
	align-items: center;
	height: 100%;
	width: 100%;
	padding-left: 5px;
	padding-right: 5px;
`

export default GenericHeader
