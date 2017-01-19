import defaultDB from '../db'

export class DB {
    constructor(db = defaultDB) {
        this.db = db;
    }

    saveToDB = (table, index, data) => {
        return this.db[table].put(data, index)
    }
}