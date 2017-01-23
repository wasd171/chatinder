import {API_GET_DEFAULTS, API_GET_DEFAULTS_SUCCESS} from 'app/constants'


export default function getDefaults() {
    return this.retrieve({req: API_GET_DEFAULTS, res: API_GET_DEFAULTS_SUCCESS})
}