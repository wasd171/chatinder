import {API_GET_USER, API_GET_USER_SUCCESS} from 'app/constants'


export default async function getUser({userId, matchId}) {
	const res = await this.retrieve({
		req: API_GET_USER,
		params: {userId, matchId},
		res: API_GET_USER_SUCCESS
	});

	if (res.status === 200) {
		return res;
	} else {
		return null;
	}
}