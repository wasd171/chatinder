import React, {Component} from 'react'
import linkref from '~/app/shims/linkref'
import $ from '~/app/shims/jquery'


class EmojiInput extends Component {
	root;
	
	get area() {
		return this.root.emojioneArea;
	}
	
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        $(this.root).emojioneArea({
            autocomplete: false,
            useInternalCDN: false,
            sprite: false,
            events: {
                focus: (editor, event) => this.props.onFocus(event),
                blur: (editor, event) => this.props.onBlur(event),
                keydown: (editor, event) => this.handleKeydown(event),
                keyup: (editor, event) => this.handleInput(event),
                'emojibtn.click': (button, event) =>  this.handleInput(event)
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === '') {
            // For some reason, setting '' results in bug (cursor at the end)
            this.area.setText(` `);
        }
    }

    handleKeydown = (event) => {
        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            this.props.onSubmit();
        }
    };

    handleInput = (event) => {
        this.props.onInput(this.area.getText());
    }

    render() {
       return (
           <div ref={linkref(this, 'root')}/>
       ) 
    }
}

export default EmojiInput;