import {VIEW_MAIN} from '../constants'


export default function showMain({view}, params = null) {
	'use strict';

	view.setCurrentView({name: VIEW_MAIN, params});
}