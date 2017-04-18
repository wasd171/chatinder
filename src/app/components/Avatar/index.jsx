import React from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'


const AvatarImage = styled.img`
	border-radius: 50%;
	height: ${props => props.size};
	min-height: ${props => props.size};
	max-height: ${props => props.size};
	width: ${props => props.size};
	min-width: ${props => props.size};
	max-width: ${props => props.size};
`;

function Avatar({match, size, src}) {
	let photo;
	if (src) {
		photo = src
	} else {
		photo = size > 84 ? match.person.largePhoto : match.person.smallPhoto;
	}

	return (
		<AvatarImage src={photo} size={`${size}px`}/>
	)
}

export default observer(Avatar)