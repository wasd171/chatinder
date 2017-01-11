import {API_GET_UPDATES, API_GET_UPDATES_SUCCESS} from 'app/constants'


export default async function getUpdates() {
	if (!this.updatePending) {
		this.setUpdatePending(true);
		return this.retrieve({req: API_GET_UPDATES, res: API_GET_UPDATES_SUCCESS});
	} else {
		return null;
	}
}