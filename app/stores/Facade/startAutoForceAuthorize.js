import {API_REQUIRE_AUTHORIZATION} from 'app/constants'


export default function startAutoForceAuthorize() {
	'use strict';
	this.ipc.on(API_REQUIRE_AUTHORIZATION, this.loginForce);
}