import React, {Component} from 'react'
import linkref from 'app/shims/linkref'
import $ from 'app/shims/jquery'
// import emojionearea from 'emojionearea'
// $.emojioneArea = emojionearea;


class EmojiInput extends Component {
    textarea;
    emojioneArea;

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.textarea = $(this.textarea).emojioneArea({
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

        this.emojioneArea = this.textarea[0].emojioneArea;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === '') {
            // For some reason, setting '' results in bug (cursor at the end)
            this.emojioneArea.setText(` `);
        }
    }

    handleKeydown = (event) => {
        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            this.props.onSubmit();
        }
    };

    handleInput = (event) => {
        this.props.onInput(this.emojioneArea.getText());
    }

    render() {
       return (
           <textarea ref={linkref(this, 'textarea')}/>
       ) 
    }
}

export default EmojiInput;