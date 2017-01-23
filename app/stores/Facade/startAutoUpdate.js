import {autorun, reaction} from 'mobx'


export default function startAutoUpdate() {
	if (!this.updateDisposer) {
		this.updateDisposer = reaction(
			() => this.time,
			() => this.api.getUpdates()
			// async () => {
			// 	const updates = await this.api.getUpdates();
			// 	if (updates) {
			// 		//TODO: proper updates merge
			// 		this.api.setUpdatePending(false);
			// 	}
			// }
		);
	}
}