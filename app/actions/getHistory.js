import {API_GET_HISTORY, API_GET_HISTORY_SUCCESS} from '../constants'
import {retrieveFromApi} from '../utils'


export default async function getHistory({tinder}) {
	const data = await retrieveFromApi({req: API_GET_HISTORY, res: API_GET_HISTORY_SUCCESS});

	tinder.setMatches(data.matches);
}