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
                blur: (editor, event) => this.props.onBlur(event)
            }
        });
        this.emojioneArea = this.textarea[0].emojioneArea;
        this.editor = this.emojioneArea.editor[0];
        
        this.editor.addEventListener('input', this.handleInput.bind(this, this.editor));
        this.editor.addEventListener('change', this.handleInput.bind(this, this.editor));
        this.editor.addEventListener('paste', this.handleInput.bind(this, this.editor));
    }

    handleInput = (editor, event) => {
        console.log({editor, event});
        this.props.onInput(editor, event, this.emojioneArea.getText.bind(this.emojioneArea))
    }

    render() {
       return (
           <textarea ref={linkref(this, 'textarea')}/>
       ) 
    }
}

export default EmojiInput;