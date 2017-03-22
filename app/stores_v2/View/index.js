import {observable, action} from 'mobx'
import {VIEW_MAIN, VIEW_LOADING} from 'app/constants'


export class View {
	@observable currentView = {
		name: VIEW_MAIN,
		params: null
	};

	@observable newChatSelected = false;

	constructor({currentView}) {
		if (currentView && currentView.name !== VIEW_LOADING) {
			this.currentView = currentView
		}
	}

	@action setCurrentView = (currentView) => {
		if (typeof currentView === 'object') {
			this.currentView.name = currentView.name;
			this.currentView.params = currentView.params;
		} else if (typeof currentView === 'string') {
			this.currentView.name = currentView;
			this.currentView.params = null;
		} else {
			throw new Error('setCurrentView supports only objects or strings as a parameter');
		}
	};

	@action setNewChatSelected = (flag) => {
		this.newChatSelected = flag;
	};
}