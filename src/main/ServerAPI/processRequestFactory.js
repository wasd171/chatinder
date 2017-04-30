// @flow
import {ServerAPI} from './ServerAPI'
import {GRAPHQL} from 'shared/constants'


interface IRequestArguments {
    id: string,
    payload: any
}

export default function processRequestFactory(instance: ServerAPI) {
    return async function processRequest(event: Electron.IpcMainEvent, args: IRequestArguments) {
        if (instance.app.window !== undefined) {
            const {id, payload} = args;
            const res = await instance.callGraphQL(payload);
            const message = instance.generateMessage(id, res);
            instance.app.window.webContents.send(GRAPHQL, message);
        }
    }
}