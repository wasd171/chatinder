import {callApi, waitForIpc, retrieveFromApi} from '../utils'
import {API_GET_PROFILE, API_GET_PROFILE_SUCCESS} from '../constants'


export default async function getProfile({tinder}) {
	const profile = await retrieveFromApi({req: API_GET_PROFILE, res: API_GET_PROFILE_SUCCESS});
	tinder.setProfile(profile.user);
}