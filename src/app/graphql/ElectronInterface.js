import {ipcRenderer} from 'electron'
import {GRAPHQL} from '~/shared/constants'
import Promise from 'bluebird'
import uuid from 'uuid'
import {print} from 'graphql/language/printer'


export class ElectronInterface {
    ipc;
    listeners = new Map();
    
    constructor(ipc = ipcRenderer) {
        this.ipc = ipc;
        this.ipc.on(GRAPHQL, this.listener)
    }

    listener = (event, args) => {
        const {id, payload} = args;
        if (!id) {
            throw new Error("Listener ID is not present!");
        }
        const resolve = this.listeners.get(id);
        if (!resolve) {
            throw new Error(`Listener with id ${id} does not exist!`);
        }
        resolve(payload);
        this.listeners.delete(id);
    }

    printRequest(request) {
        return {
            ...request,
            query: print(request.query)
        }
    }

    generateMessage(id, request) {
        return {
            id,
            payload: this.printRequest(request)
        }
    }

    setListener(request, resolve, reject) {
        const id = uuid.v1();
        this.listeners.set(id, resolve);
        const message = this.generateMessage(id, request);
        this.ipc.send(GRAPHQL, message);
    }

    query = (request) => {
        return new Promise(this.setListener.bind(this, request));
    }
}