declare module 'is-reachable' {
	function isReachable(url: string): Promise<boolean>
	export = isReachable
}

declare module '*.graphql' {
	import { DocumentNode, Location, DefinitionNode } from 'graphql'
	export const kind: 'Document'
	export const loc: Location | undefined
	export const definitions: Array<DefinitionNode>
}

declare module 'emojione/package.json' {
	export const version: string
}

declare namespace NodeJS {
	export interface Global {
		jQuery: any
		emojione: any
		emojioneVersion: string
		Perf: any
	}
}

declare module 'react-image-gallery' {
	import * as React from 'react'

	export type ClickHandler = React.MouseEventHandler<HTMLButtonElement>
	type CustomRenderer = (
		onClick: ClickHandler,
		disabled: boolean
	) => JSX.Element

	export interface Item {
		original: string
	}

	interface Props {
		items: Item[]
		showPlayButton: boolean
		showBullets: boolean
		showThumbnails: boolean
		showFullscreenButton: boolean
		infinite: boolean
		renderLeftNav: CustomRenderer
		renderRightNav: CustomRenderer
	}

	class ImageGallery extends React.Component<Props> {}
	export default ImageGallery
}

declare module 'material-ui/TextField/TextFieldHint' {
	import * as React from 'react'
	import { MuiTheme } from 'material-ui/styles'

	interface Props {
		muiTheme: MuiTheme
		show: boolean
		text: string
	}

	class TextFieldHint extends React.Component<Props> {}

	export default TextFieldHint
}

declare module 'material-ui/TextField/TextFieldUnderline' {
	import * as React from 'react'
	import { MuiTheme } from 'material-ui/styles'

	interface Props {
		muiTheme: MuiTheme
		disabled: boolean
		focus: boolean
	}

	class TextFieldUnderline extends React.Component<Props> {}

	export default TextFieldUnderline
}
