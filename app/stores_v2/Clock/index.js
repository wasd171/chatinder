import {observable, action, computed} from 'mobx'
import mobxUtils from 'mobx-utils'


export class Clock {
	@observable interval;

	@computed get time() {
		return mobxUtils.now(this.interval);
	}

	constructor(interval = 10000) {
		this.updateInterval(interval);
	}

	@action updateInterval = (interval) => {
		this.interval = interval;
	}
}