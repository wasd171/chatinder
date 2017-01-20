import defaultDB from './db'
import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader?inline!babel-loader!./worker.js'
import {WORKER_SET_MATCHES, WORKER_GET_MATCHES, WORKER_SET_PROFILE, WORKER_SET_PERSON, WORKER_GET_INITIAL} from 'app/constants'


export class DB {
    constructor(db = defaultDB) {
        this.db = db;
        this.worker = new PromiseWorker(new Worker());
    }

    sendToWorker = (type, payload = null) => {
        return this.worker.postMessage({type, payload})
    }

    saveToDB = (table, index, data) => {
        return this.db[table].put(data, index)
    };

    setMatches = (history) => {
        return this.sendToWorker(WORKER_SET_MATCHES, history);
    };

    getMatches = (matches) => {
        return this.sendToWorker(WORKER_GET_MATCHES, matches);
    };

    saveProfile = (profile) => {
        return this.sendToWorker(WORKER_SET_PROFILE, profile);
    }

    savePerson = (profile) => {
        return this.sendToWorker(WORKER_SET_PERSON, profile);
    }

    getInitial = () => {
        return this.sendToWorker(WORKER_GET_INITIAL)
    }
}