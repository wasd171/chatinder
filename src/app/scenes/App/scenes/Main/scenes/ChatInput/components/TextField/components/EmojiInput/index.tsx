import * as React from 'react'
import linkref, { ILinkedRefs } from '~/app/shims/linkref'
import $ from '~/app/shims/jquery'

interface Editor extends HTMLDivElement {
	emojioneArea: {
		getText(): string
		setText(value: string): any
		hidePicker(): any
	}
}

export type onSubmitType = () => any
export interface IEmojiInputProps {
	onInput: (value: string) => any
	onSubmit: onSubmitType
	onFocus: (event: FocusEvent) => any
	onBlur: (event: FocusEvent) => any
	value: string
}

class EmojiInput extends React.Component<IEmojiInputProps> {
	_linkedRefs: ILinkedRefs
	root: Editor

	get area() {
		return this.root.emojioneArea
	}

	shouldComponentUpdate() {
		return false
	}

	componentDidMount() {
		$(this.root).emojioneArea({
			autocomplete: false,
			useInternalCDN: false,
			sprite: false,
			events: {
				focus: (_editor: Editor, event: FocusEvent) =>
					this.props.onFocus(event),
				blur: (_editor: Editor, event: FocusEvent) =>
					this.props.onBlur(event),
				keydown: (_editor: Editor, event: KeyboardEvent) =>
					this.handleKeydown(event),
				keyup: (_editor: Editor, event: KeyboardEvent) =>
					this.handleInput(event),
				'emojibtn.click': (_button: HTMLButtonElement, event: Event) =>
					this.handleInput(event)
			}
		})
	}

	componentWillReceiveProps(nextProps: IEmojiInputProps) {
		if (nextProps.value === '') {
			// For some reason, setting '' results in bug (cursor at the end)
			this.area.setText(` `)
			this.area.hidePicker()
		}
	}

	handleKeydown = (event: KeyboardEvent) => {
		if (event.which === 13 && !event.shiftKey) {
			event.preventDefault()
			this.props.onSubmit()
		}
	}

	handleInput = (_event: Event) => {
		this.props.onInput(this.area.getText())
	}

	render(): JSX.Element {
		return <div ref={linkref(this, 'root')} />
	}
}

export default EmojiInput
