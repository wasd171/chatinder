import Dexie from 'dexie'
import db from './db'
import registerPromiseWorker from 'promise-worker/register'
import {
    WORKER_SET_MATCHES, 
    WORKER_GET_MATCHES, 
    WORKER_SET_PROFILE, 
    WORKER_SET_PERSON, 
    WORKER_GET_INITIAL,
    WORKER_SET_UPDATES
} from 'app/constants'
import {
    LF_FB_TOKEN_EXPIRES_AT,
	LF_FB_TOKEN,
	LF_FB_ID,
	LF_TINDER_TOKEN,
	LF_CURRENT_VIEW,
	LF_TINDER_MATCHES,
	LF_TINDER_PROFILE,
    LF_TINDER_DEFAULTS
} from 'app/constants'
import {validateMatch, normalizeMatch, normalizeMessage, normalizePerson} from './utils'


function putPerson(person) {
    db.users.put(normalizePerson(person))
}

function queryMatches(matches) {
    let queriedMatches;
    if (matches) {
        queriedMatches = db.matches.where('_id').anyOf(matches);
    } else {
        queriedMatches = db.matches;
    }

    return queriedMatches.toArray(resolvedMatches => Dexie.Promise.all(
        resolvedMatches.map(match => {
            let newMatch = match;
            return Dexie.Promise.all([
                db.messages.where('_id').anyOf(match.messages).sortBy('timestamp'),
                // TODO version 2 should handle chats with more then 1 participant
                db.users.where('_id').anyOf(match.participants).first()
            ]).then(result => {
                [newMatch.messages, newMatch.person] = result;
                return newMatch;
            })
        })
    ))
}

function setMatches(matches) {
    return db.transaction('rw', db.matches, db.messages, db.users, () => {
        const validMatches = matches.filter(validateMatch);
        validMatches.forEach(match => {
            db.matches.put(normalizeMatch(match));

            let previousMessage = null;
		    match.messages.forEach(message => {
                const nextMessage = normalizeMessage({message, previousMessage});
                db.messages.put(nextMessage);
                previousMessage = nextMessage;
		    });
            previousMessage = null;

            if (Array.isArray(match.person)) {
                match.person.forEach(putPerson)
            } else {
                putPerson(match.person)
            }
        });

        const matchIds = validMatches.map(match => match['_id']);
        return queryMatches(matchIds);
    })
}

function getMatches(matches) {
    return db.transaction('r', db.matches, db.messages, db.users, queryMatches.bind(null, matches))
}

function setProfile(profile) {
    return db.transaction('rw', db.saved, () => {
        // TODO might need to do a separate normalization in the future
        const newProfile = normalizePerson(profile);
        db.saved.put(newProfile, LF_TINDER_PROFILE);
        return db.saved.get(LF_TINDER_PROFILE);
    })
}

function setPerson(profile) {
    return db.transaction('rw', db.matches, db.users, () => {
        putPerson(profile);
        return Dexie.Promise.all([
            db.matches.where('participants').equals(profile['_id']).first(),
            db.users.get(profile['_id'])
        ]).then(([match, user]) => {
            return {
                matchId: match['_id'],
                user
            }
        })
    })
}

function getInitial() {
    return db.transaction('r',  db.matches, db.messages, db.users, db.auth, db.saved, () => {
        return Dexie.Promise.all([
            db.auth.get(LF_FB_TOKEN),
            db.auth.get(LF_FB_TOKEN_EXPIRES_AT),
            db.auth.get(LF_FB_ID),
            db.auth.get(LF_TINDER_TOKEN),
            db.saved.get(LF_CURRENT_VIEW),
            db.saved.get(LF_TINDER_PROFILE),
            queryMatches(),
            db.saved.get(LF_TINDER_DEFAULTS)
        ]).then(([fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, profile, matches, tinderDefaults]) => {
            return {fbToken, fbTokenExpiresAt, fbId, tinderToken, currentView, profile, matches, tinderDefaults}
        })
    })
}

function setUpdates(updates) {
    const {matches} = updates;
    return db.transaction('rw', db.matches, db.messages, () => {
        return Dexie.Promise.all(matches.map(async match => {
            const resolvedMessages = await db.messages.where('match_id').equals(match['_id']).sortBy('timestamp');
            let previousMessage = resolvedMessages[resolvedMessages.length - 1];
            let putMessagePromises = [];
            let normalizedMessages = [];
            match.messages.forEach(message => {
                const nextMessage = normalizeMessage({message, previousMessage});
                putMessagePromises.push(db.messages.put(nextMessage));
                normalizedMessages.push(nextMessage);
                previousMessage = nextMessage;
            });
            const pushedMessageIds = await Dexie.Promise.all(putMessagePromises);
            const currentMatch = await db.matches.get(match['_id']);
            await db.matches.where('_id').equals(match['_id']).modify({
                lastActivityDate: match['last_activity_date'],
                messages: [...currentMatch.messages, ...pushedMessageIds]
            });

            return {
                _id: match['_id'],
                lastActivityDate: match['last_activity_date'],
                isNewMessage: match['is_new_message'],
                messages: normalizedMessages
            }        
        }))
    })
}

registerPromiseWorker(e => {
    switch (e.type) {
        case WORKER_SET_MATCHES:
            return setMatches(e.payload.matches);
        case WORKER_GET_MATCHES:
            return getMatches(e.payload);
        case WORKER_SET_PROFILE:
            return setProfile(e.payload);
        case WORKER_SET_PERSON:
            return setPerson(e.payload);
        case WORKER_GET_INITIAL:
            return getInitial();
        case WORKER_SET_UPDATES:
            return setUpdates(e.payload);
    }
})