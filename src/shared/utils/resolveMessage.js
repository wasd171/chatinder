// @flow
import {Message} from '~/main/ServerAPI/schema/resolvers/instances'


export function resolveMessage(message, props: Array<string>): Object {
    return props.reduce((msg: {}, key: string) => {
        if (key !== 'status' && Message[key] !== undefined) {
            msg[key] = Message[key](message[key]);
        } else {
            msg[key] = message[key];
        }
        return msg
    }, {});
}