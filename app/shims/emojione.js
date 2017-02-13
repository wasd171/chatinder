const emojione = require('emojione');
const packageJSON = require('emojione/package.json');
let configuredEmojione = Object.assign(
    {},
    emojione,
    {
        imageType: 'png',
        sprites: false,
        imagePathPNG: '../node_modules/emojione/assets/png/'
    }
)
// emojione.imageType = 'png';
// emojione.sprites = false;
// emojione.imagePathPNG = '../node_modules/emojione/assets/png/';
window.emojioneVersion = packageJSON.version;
window.confE = configuredEmojione;

// Need this ugly fix for imports-loader
module.exports = configuredEmojione