import {VIEW_LOADING} from '../constants'


export default function showLoading({view}, title) {
	view.setCurrentView({name: VIEW_LOADING, params: {title}});
}