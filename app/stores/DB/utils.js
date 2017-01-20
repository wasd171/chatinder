import omit from 'lodash/omit'
import emojione from 'emojione'
emojione.imageType = 'svg';
emojione.sprites = true;
emojione.imagePathSVGSprites = '';


export function normalizeMatch(match) {
    let newMatch = match;
    newMatch = omit(newMatch, ['messages', 'person', 'last_activity_date']);
    newMatch.messages = [];
    newMatch.lastActivityDate = match['last_activity_date'];
    match.messages.forEach(message => newMatch.messages.push(message['_id']));

    return newMatch;
}

export function normalizeMessage({message, previousMessage}) {
    let newMessage = message;
    newMessage = omit(newMessage, ['message', 'sent_date']);
    newMessage.formattedMessage = emojione.unicodeToImage(message.message);
    newMessage.sentDate = message['sent_date'];
    if (previousMessage && previousMessage.from === newMessage.from) {
        newMessage.messageGroup = previousMessage.messageGroup
    } else {
        newMessage.messageGroup = `${newMessage.from}_${newMessage._id}`;
    }

    return newMessage;
}

export function normalizePerson(person) {
    let newPerson = person;
    newPerson = omit(newPerson, ['birth_date', 'ping_time', 'photos']);
    newPerson.birthDate = person['birth_date'];
    newPerson.pingTime = person['ping_time'];
    newPerson.smallPhoto = person.photos[0].processedFiles[3].url;
    newPerson.largePhoto = person.photos[0].processedFiles[0].url;

    return newPerson;
}