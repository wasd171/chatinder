import {VIEW_LOADING} from 'app/constants'


export default function goToLoading(title) {
	this.view.setCurrentView({name: VIEW_LOADING, params: {title}});
}