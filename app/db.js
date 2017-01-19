import Dexie from 'dexie'

const db = new Dexie('chatinderDB');
db.version(1).stores({
    auth: '',
    saved: '',
    matches: '_id, *participants, *messages',
    users: '_id, name',
    messages: '_id, match_id, message'
})

export default db;