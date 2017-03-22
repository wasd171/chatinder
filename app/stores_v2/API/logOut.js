import {API_LOGOUT} from 'app/constants'


export default function logOut() {
    return this.retrieve({req: API_LOGOUT});
}