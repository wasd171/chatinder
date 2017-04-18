import emojione from 'emojione'
import packageJSON from 'emojione/package.json'


function configureEmojione() {
    let configuredEmojione = Object.assign(
        {},
        emojione,
        {
            imageType: 'png',
            sprites: false,
            imagePathPNG: '../node_modules/emojione/assets/png/'
        }
    )
    
    if (typeof window !== "undefined") {
        // Needed for emojionearea
	    window.emojioneVersion = packageJSON.version;
    }
    return configuredEmojione
}

export default configureEmojione()