// @flow
import $ from 'jquery'
import emojione from './emojione'


function shimJQueryPlugins() {
    global.jQuery = $;
    window.emojione = emojione;
    require('emojionearea');
    return global.jQuery
}

export default shimJQueryPlugins()