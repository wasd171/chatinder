import {API_GET_USER, API_GET_USER_SUCCESS} from '../constants'
import {retrieveFromApi} from '../utils'


export default async function getUser({view, tinder}) {
	const match = tinder.matches.get(view.currentView.params.matchId);
	const userId = match.person['_id'];
	const userObj = await retrieveFromApi({req: API_GET_USER, params: {userId}, res: API_GET_USER_SUCCESS});

	if (userObj && userObj.status === 200 && userObj.results['_id'] === userId) {
		match.person.updatePerson(userObj.results);
	}
}