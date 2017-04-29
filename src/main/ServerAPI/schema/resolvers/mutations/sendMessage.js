// @flow
import type {ServerAPI} from '~/main/ServerAPI'
import Bluebird from 'bluebird'
import {SUCCESS, FAILURE} from '~/shared/constants'
import {normalizeMessagePair} from '~/shared/utils'

type Arguments = {
    id: string,
    rawMessage: any
}

export async function sendMessage(obj: void, args: Arguments, ctx: ServerAPI) {
    const {matches, pending} = ctx.db;
    const {rawMessage, id} = args;
    let match;

    match = await Bluebird.fromCallback(callback => matches.findOne({_id: id}, callback));
    let optimisticMessage;
    if (match.messages.length === 0) {
        optimisticMessage = normalizeMessagePair(rawMessage);
    } else {
        optimisticMessage = normalizeMessagePair(rawMessage, match.messages[match.messages.length - 1]);
    }


    await Promise.all([
        Bluebird.fromCallback(callback => pending.insert(rawMessage, callback)),
        Bluebird.fromCallback(callback => matches.update(
            {_id: id}, 
            {
                $push: {messages: optimisticMessage}
            }, 
            {}, 
            callback
        ))
    ])

    try {
        const message = await ctx.tinder.sendMessage(id, rawMessage.message);
        await Promise.all([
            Bluebird.fromCallback(callback => pending.remove({_id: rawMessage._id}, {}, callback)),
            Bluebird.fromCallback(callback => matches.update(
                {_id: id},
                {
                    $pull: {
                        messages: {
                            _id: rawMessage._id
                        }
                    }
                },
                {},
                callback
            ))
        ]);
        
        match = await Bluebird.fromCallback(callback => matches.findOne({_id: id}, callback));
        if (match.messages.length === 0) {
            optimisticMessage = normalizeMessagePair(message);
        } else {
            optimisticMessage = normalizeMessagePair(message, match.messages[match.messages.length - 1]);
        }
        return optimisticMessage
    } catch (err) {
        await Bluebird.fromCallback(callback => pending.update(
            {_id: rawMessage._id},
            {$set: {status: FAILURE}},
            {},
            callback
        ));

        optimisticMessage.status = FAILURE;
        return optimisticMessage;
    }
}