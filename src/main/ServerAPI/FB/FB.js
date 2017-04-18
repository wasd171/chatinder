// @flow
import getId from './getId'
import getToken from './getToken'
import loginForce from './loginForce'
import login from './login'
import Promise from 'bluebird'


type tokenType = string | undefined;
type expiresAtType = number | undefined;
type idType = string | undefined;
interface fbProps {
    token: tokenType,
    expiresAt: expiresAtType,
    id: idType,
    db: Nedb
}

export class FB {
    token: tokenType;
    expiresAt: expiresAtType;
    id: idType;
    db: Nedb;

    getId = getId(this);
    getToken = getToken;
    loginForce = loginForce(this);
    login = login(this);

    constructor({token, expiresAt, id, db}: fbProps) {
        this.db = db;
        this.token = token;
        this.expiresAt = expiresAt;
        this.id = id;
    }

    setToken = async (token: tokenType) => {
        this.token = token;
        return Promise.fromCallback(callback => this.db.update({_id: 'fb'}, {$set: {token}}, {upsert: true}, callback));
        // this.storage.setItem(LF_FB_TOKEN, token);
    }

    setExpiration = async (expiration: expiresAtType) => {
        this.expiresAt = expiration;
        return Promise.fromCallback(callback => this.db.update({_id: 'fb'}, {$set: {expiresAt: expiration}}, {upsert: true}, callback));
        // this.storage.setItem(LF_FB_TOKEN_EXPIRES_AT, expiration);
    }

    setId = async (id: idType) => {
        this.id = id;
        return Promise.fromCallback(callback => this.db.update({_id: 'fb'}, {$set: {id}}, {upsert: true}, callback));
        // this.storage.setItem(LF_FB_ID, id);
    }
}