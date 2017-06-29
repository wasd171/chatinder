import styled from 'styled-components'

export interface IGenericNameSpanProps {
	theme: {
		palette: {
			textColor: string
		}
	}
	clickable?: boolean
}

const GenericNameSpan = styled.span`
	color: ${(props: IGenericNameSpanProps) => props.theme.palette.textColor};
	cursor: ${(props: IGenericNameSpanProps) =>
		props.clickable ? 'pointer' : 'default'};
`

export default GenericNameSpan
