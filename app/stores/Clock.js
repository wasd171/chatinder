import {Atom} from 'mobx'


export class Clock {
	atom;
	interval = null;
	currentDateTime;

	constructor() {
		this.atom = new Atom('Clock', this.startTicking, this.stopTicking)
	}

	getTime = () => {
		if (this.atom.reportObserved()) {
			return this.currentDateTime;
		} else {
			return new Date();
		}
	};

	tick = () => {
		this.currentDateTime = new Date();
		this.atom.reportChanged();
	};

	startTicking = () => {
		this.tick();
		this.interval = setInterval(this.tick, 10000);
	};

	stopTicking = () => {
		clearInterval(this.interval);
		this.interval = null;
	};
}