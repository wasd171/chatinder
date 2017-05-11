// @flow
import {join} from 'path'


function resolve(path: string): string {
    return join(__dirname, path);
}

export function resolveRoot(): string {
    const require = {resolve};

    return require.resolve('@root');
}