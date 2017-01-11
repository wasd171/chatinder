import {API_GET_UPDATES, API_GET_UPDATES_SUCCESS} from '../constants'
import {retrieveFromApi} from '../utils'


export default async function getUpdates() {
	const data = await retrieveFromApi({req: API_GET_UPDATES, res: API_GET_UPDATES_SUCCESS});

	if (data.matches.length !== 0) {
		console.log(data.matches)
	}
}