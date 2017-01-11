import {VIEW_AUTH, VIEW_MAIN} from 'app/constants'


export default function goToMain(params = null) {
	if (!this.api.fbAuthIsPerformed) {
		this.view.setCurrentView({name: VIEW_AUTH, params})
	} else {
		this.view.setCurrentView({name: VIEW_MAIN, params});
	}
}