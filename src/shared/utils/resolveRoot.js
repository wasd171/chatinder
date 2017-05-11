// @flow
import {resolve} from './resolve'

export function resolveRoot(): string {
    const require = {resolve};

    return require.resolve('@root');
}