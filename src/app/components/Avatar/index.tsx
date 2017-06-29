import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

export interface IAvatarImageProps {
	sizeProp: string
}

const AvatarImage = styled.img`
	border-radius: 50%;
	height: ${(props: IAvatarImageProps) => props.sizeProp};
	min-height: ${(props: IAvatarImageProps) => props.sizeProp};
	max-height: ${(props: IAvatarImageProps) => props.sizeProp};
	width: ${(props: IAvatarImageProps) => props.sizeProp};
	min-width: ${(props: IAvatarImageProps) => props.sizeProp};
	max-width: ${(props: IAvatarImageProps) => props.sizeProp};
`

export interface IMatchReduced {
	person: {
		largePhoto: string
		smallPhoto: string
	}
}

export interface IAvatarProps {
	match?: IMatchReduced
	size: number
	src?: string
}

function Avatar({ match, size, src }: IAvatarProps) {
	let photo: string
	if (src !== undefined) {
		photo = src
	} else {
		photo =
			size > 84
				? (match as IMatchReduced).person.largePhoto
				: (match as IMatchReduced).person.smallPhoto
	}

	return <AvatarImage src={photo} sizeProp={`${size}px`} />
}

export default observer(Avatar)
