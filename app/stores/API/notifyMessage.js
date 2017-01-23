import {SHOW_NOTIFICATION} from 'app/constants'
import {isGIPHY} from 'app/utils'


export default function notifyMessage(person, message) {
    this.retrieve({
        req: SHOW_NOTIFICATION, 
        params: {
            title: person.name, 
            message: isGIPHY(message) ? `GIF` : message
        }
    })
}