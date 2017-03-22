import {API_GET_PROFILE, API_GET_PROFILE_SUCCESS} from 'app/constants'


export default async function getProfile() {
	return this.retrieve({req: API_GET_PROFILE});
}