// @flow
import {join} from 'path'


export function resolve(path: string): string {
    // Note that it only works because it's in the same folder with resolveDatabases and resolveRoot!
    return join(__dirname, path)
}