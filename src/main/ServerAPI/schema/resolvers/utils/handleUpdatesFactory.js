// @flow
import {ServerAPI} from '~/main/ServerAPI'
import BPromise from 'bluebird'
import {normalizeMatch} from './normalizeMatch'
import {normalizeMessage} from './normalizeMessage'


export function handleUpdatesFactory(ctx: ServerAPI) {
    return async function handleUpdates(updates: any): Promise<void> {
        if (updates.matches.length === 0) {
            return;
        }
        
        const {refetcher, db} = ctx;
        await BPromise.all(updates.matches.map(async match => {
            const query = {_id: match._id};
            const oldMatch = await BPromise.fromCallback(callback => db.matches.findOne(query, {}, callback));
            if (!oldMatch) {
                const newMatch = normalizeMatch(match);
                await BPromise.fromCallback(callback => db.matches.insert(newMatch, callback));
            } else {
                let formattedMessages, modifier;

                if (oldMatch.messages.length === 0) {
                    const formattedMessages = match.messages.map(normalizeMessage);
                    modifier = {
                        $set: {
                            messages: formattedMessages, 
                            last_activity_date: match.last_activity_date
                        }
                    };
                } else {
                    let lastMessage = oldMatch.messages[oldMatch.messages.length - 1];
                    [lastMessage, ...formattedMessages] = [lastMessage, ...match.messages].map(normalizeMessage);
                    modifier = {
                        $set: {
                            last_activity_date: match.last_activity_date
                        }, 
                        $push: {
                            messages: {
                                $each: formattedMessages
                            }
                        }
                    };
                }
                
                await BPromise.fromCallback(callback => db.matches.update(query, modifier, {}, callback));

                refetcher.notifyMatch(match._id);
            }
        }));

        refetcher.notifyAllMatches();
    }
}