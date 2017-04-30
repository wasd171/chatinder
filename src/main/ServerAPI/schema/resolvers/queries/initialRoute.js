// @flow
import {count, success, isOnline} from '../utils'
import {VIEW_MAIN, VIEW_AUTH, VIEW_OFFLINE} from 'shared/constants'
import {login} from '../mutations'
import type {ServerAPI} from 'main/ServerAPI'
import {nameToPath} from 'shared/utils'


type Arguments = {
}

type Output = Promise<string>

export async function initialRoute(obj: void, args: Arguments, ctx: ServerAPI): Output {
    const res = await login(obj, {silent: true}, ctx);
    
    if (res.status === success.status) {
        return nameToPath(VIEW_MAIN)
    } else {
        const matchesCount = await count(ctx.db.matches, {});
        if (matchesCount !== 0) {
            return nameToPath(VIEW_MAIN)
        }

        const online = await isOnline();        

        if (!online) {
            return nameToPath(VIEW_OFFLINE)
        } else {
            return nameToPath(VIEW_AUTH)
        }
    }
}