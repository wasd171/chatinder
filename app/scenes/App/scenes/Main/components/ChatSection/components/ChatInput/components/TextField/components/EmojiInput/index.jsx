import Inferno from 'inferno'
import Component from 'inferno-component'
import linkref from 'linkref'
import $ from 'app/shims/jquery'
import Promise from 'bluebird'
// import emojionearea from 'emojionearea'
// $.emojioneArea = emojionearea;


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
                'emojibtn.click': (button, event) =>  this.handleInput(event)
            }
        });
        console.log({textarea: this.textarea});
        this.emojioneArea = this.textarea[0].emojioneArea;
    }

    handleInput = (event) => {
        console.log({event});
        if (event.which == 13 && !event.shiftKey) {
            event.preventDefault();
            this.props.onSubmit();
            this.emojioneArea.setText('');
        } else {
            console.log(this.emojioneArea);
            this.props.onInput(event.target, event, this.emojioneArea.getText.bind(this.emojioneArea));
        }
    }

    render() {
       return (
           <textarea ref={linkref(this, 'textarea')} id="txt" onInput={console.log}/>
       ) 
    }
}

export default EmojiInput;