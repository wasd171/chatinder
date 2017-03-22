import {API_GET_HISTORY, API_GET_HISTORY_SUCCESS} from 'app/constants'


export default async function getHistory() {
	return this.retrieve({req: API_GET_HISTORY, res: API_GET_HISTORY_SUCCESS});
}