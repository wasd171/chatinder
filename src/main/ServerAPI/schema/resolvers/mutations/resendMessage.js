// @flow
import type {ServerAPI} from 'main/ServerAPI'
import Bluebird from 'bluebird'
import {SUCCESS, FAILURE} from 'shared/constants'


type Arguments = {
    id: string,
    messageId: string
}

export async function resendMessage(obj: void, args: Arguments, ctx: ServerAPI) {
    const {id, messageId} = args;
    const {matches, pending} = ctx.db;
    // await Bluebird.delay(10000); //Just for UX, otherwise it's not clear that we have attempted to do a resend
    try {
        const rawMessage = await Bluebird.fromCallback(callback => pending.findOne({_id: messageId}, callback));
        const message = await ctx.tinder.sendMessage(id, rawMessage.message);
        await Promise.all([
            Bluebird.fromCallback(callback => pending.remove({_id: messageId}, {}, callback)),
            Bluebird.fromCallback(callback => matches.update(
                {_id: id},
                {
                    $pull: {
                        messages: {
                            _id: messageId
                        }
                    }
                },
                {},
                callback
            ))
        ]);
        return {
            _id: messageId,
            status: SUCCESS
        }
    } catch (err) {
        return {
            _id: messageId,
            status: FAILURE
        }
    }
}