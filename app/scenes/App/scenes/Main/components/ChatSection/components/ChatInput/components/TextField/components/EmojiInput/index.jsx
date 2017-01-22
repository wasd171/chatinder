import Inferno from 'inferno'
import Component from 'inferno-component'
import linkref from 'linkref'
import $ from 'jquery'
import 'emojionearea'


class EmojiInput extends Component {
    textarea;
    emojioneArea;
    editor;

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.textarea = $(this.refs.textarea).emojioneArea({
            autocomplete: false,
            useInternalCDN: false,
            sprite: false,
            events: {
                focus: (editor, event) => this.props.onFocus(event),
                blur: (editor, event) => this.props.onBlur(event),
                keydown: (editor, event) => this.handleInput(event),
                emojibtn_click: (button, event) =>  this.handleInput(event)
            }
        });
        this.emojioneArea = this.textarea[0].emojioneArea;
        this.editor = this.emojioneArea.editor[0];
    }

    handleInput = (event) => {
        this.props.onInput(this.editor, event, this.emojioneArea.getText.bind(this.emojioneArea))
    }

    render() {
       return (
           <textarea ref={linkref(this, 'textarea')}/>
       ) 
    }
}

export default EmojiInput;