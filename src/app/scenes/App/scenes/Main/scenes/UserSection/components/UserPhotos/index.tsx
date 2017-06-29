import * as React from 'react'
import ImageGallery from 'react-image-gallery'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { MuiTheme } from 'material-ui/styles'

const GalleryNav = styled.button`
	&:hover::before {
		color: ${props => props.theme.palette.primary1Color};
	}
`

type onClickHandlerType = React.MouseEventHandler<HTMLButtonElement>

interface IrenderGenericNavArgs {
	className: string
	disabled: boolean
	onClick: onClickHandlerType
}

interface IImageGalleryItem {
	original: string
}

export interface IUserPhotosProps {
	muiTheme?: MuiTheme
	photos: Array<IImageGalleryItem>
}

@muiThemeable()
class UserPhotos extends React.Component<IUserPhotosProps> {
	renderGenericNav = ({
		className,
		onClick,
		disabled
	}: IrenderGenericNavArgs) => {
		return (
			<GalleryNav
				disabled={disabled}
				onClick={onClick}
				className={className}
				theme={this.props.muiTheme}
			/>
		)
	}

	renderLeftNav = (onClick: onClickHandlerType, disabled: boolean) => {
		return this.renderGenericNav({
			onClick,
			disabled,
			className: 'image-gallery-left-nav'
		})
	}

	renderRightNav = (onClick: onClickHandlerType, disabled: boolean) => {
		return this.renderGenericNav({
			onClick,
			disabled,
			className: 'image-gallery-right-nav'
		})
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
