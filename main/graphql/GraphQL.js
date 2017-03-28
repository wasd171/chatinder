import {ipcMain} from 'electron'
import {graphql} from 'graphql'
import {GRAPHQL} from '../../app/constants'
import {schema as defaultSchema} from './schema'


export class GraphQL {
    ipc;
    webContents;
    schema;

    constructor(webContents, ipc = ipcMain, schema = defaultSchema) {
        this.webContents = webContents;
        this.ipc = ipc;
        this.schema = schema;
        this.ipc.on(GRAPHQL, this.processRequest);
    }

    generateMessage(id, responce) {
        return {
            id,
            payload: responce
        }
    }

    processRequest = async (event, args) => {
        const {id, payload} = args;
        const responce = await graphql(this.schema, payload.query);
        // console.log({id, payload, responce});
        const message = this.generateMessage(id, responce);
        this.webContents.send(GRAPHQL, message);
    }
}