import React, {Component} from 'react'
import ImageGallery from 'react-image-gallery'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'


const GalleryNav = styled.button`
	&:hover::before {
		color: ${props => props.theme.palette.primary1Color}
	}
`;

@muiThemeable()
class UserPhotos extends Component {
	renderGenericNav = ({className, onClick, disabled}) => {
		return (
			<GalleryNav
				disabled={disabled}
        		onClick={onClick}
				className={className}
				theme={this.props.muiTheme}
			/>
		)
	}

	renderLeftNav = (onClick, disabled) => {
		return this.renderGenericNav({onClick, disabled, className: 'image-gallery-left-nav'});
	}

	renderRightNav = (onClick, disabled) => {
		return this.renderGenericNav({onClick, disabled, className: 'image-gallery-right-nav'});
	}

	render() {
		return (
			<ImageGallery
				items={this.props.photos}
				showPlayButton={false}
				showBullets={true}
				showThumbnails={false}
				showFullscreenButton={false}
				infinite={false}
				renderLeftNav={this.renderLeftNav}
				renderRightNav={this.renderRightNav}
			/>
		)
	}
}

export default UserPhotos