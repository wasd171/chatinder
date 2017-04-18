// @flow
import {emojify} from './emojify'
import format from 'date-fns/format'
import {isGIPHY} from '~/shared/utils'
import type {MessageType} from '~/shared/types'


export function normalizeMessage(message: any, index: number, messages: any[]): MessageType {
    const msg = Object.assign({}, message);

    const text = msg.message;
    const giphyStatus: boolean = isGIPHY(text);
    msg.isGIPHY = giphyStatus;
    if (giphyStatus) {
        msg.formattedMessage = text;
    } else {
        msg.formattedMessage = emojify(text);
    }

    msg.sentDay = format(msg.timestamp, 'MMMM D');
    msg.sentTime = format(msg.timestamp, 'H:mm');
    if (index === 0) {
        msg.first = true;
        msg.firstInNewDay = true;
    } else {
        const prevMessage = messages[index - 1];
        const prevSentDay = format(prevMessage.timestamp, 'MMMM D');
        if (prevSentDay !== msg.sentDay) {
            msg.first = true;
            msg.firstInNewDay = true;
        } else if (prevMessage.from !== msg.from){
            msg.first = true;
            msg.firstInNewDay = false;
        } else {
            msg.first = false;
            msg.firstInNewDay = false;
        }
    }
    
    return msg
}