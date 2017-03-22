import {API_GET_USER, API_GET_USER_SUCCESS} from 'app/constants'


export default function getUser(userId) {
	return this.retrieve({
		req: API_GET_USER,
		params: {userId}
	});

	// if (res.status === 200) {
	// 	return res;
	// } else {
	// 	return null;
	// }
}