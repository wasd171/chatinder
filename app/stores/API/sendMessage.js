import {API_SEND_MESSAGE} from 'app/constants'


export default function sendMessage(to, message) {
    this.retrieve({
        req: API_SEND_MESSAGE,
        params: {
            to,
            message
        }
    })
}