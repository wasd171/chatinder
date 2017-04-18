import {CellMeasurerCache} from 'react-virtualized'


export class Caches {
    _messages = new Map();
    _ids = new Map();

    generateKey(id, width) {
        return `${id}_${width}`;
    }

    getMessagesCache = (id, width) => {
        const key = this.generateKey(id, width);

        if (this._messages.has(key)) {
            return this._messages.get(key);
        } else {
            const cache = new CellMeasurerCache({
                fixedWidth: true,
                defaultHeight: 33,
                defaultWidth: width
            });
            if (width !== 0) {
                this._messages.set(key, cache);
            }
            return cache;
        }
    }

    getShouldMeasureEverything = (id, width) => {
        const key = this.generateKey(id, width);

        return this._ids.has(key);
    }

    forbidMeasureEverything = (id, width) => {
        const key = this.generateKey(id, width);

        this._ids.set(key, true);
    }
}