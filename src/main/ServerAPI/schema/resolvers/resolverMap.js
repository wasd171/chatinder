// @flow
import {isAuthorized, matches, profile, match} from './queries'
import {login, showWindow, logout, sendMessage, updatePerson, checkDoMatchesExist, subscribeToUpdates} from './mutations'
import {Profile, Person, Match, Message} from './instances'


export const resolverMap = {
    Query: {
        isAuthorized,
        matches,
        profile,
        match
    },
    Mutation: {
        login,
        showWindow,
        logout,
        sendMessage,
        updatePerson,
        checkDoMatchesExist,
        subscribeToUpdates
    },
    Profile,
    Person,
    Match,
    Message
}