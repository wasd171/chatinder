import {observable, action, when} from 'mobx'
import tinder from 'tinder'
import Promise from 'bluebird'
import {
	API_AUTHORIZE,
	API_AUTHORIZE_SUCCESS,
	API_REQUIRE_AUTHORIZATION,
	API_SET_TOKEN,
	API_SET_TOKEN_SUCCESS,
	API_GET_HISTORY,
	API_GET_HISTORY_SUCCESS,
	API_GET_UPDATES,
	API_GET_UPDATES_SUCCESS,
	API_GET_USER,
	API_GET_USER_SUCCESS,
	API_GET_PROFILE,
	API_GET_PROFILE_SUCCESS,
	API_GET_REC,
	API_GET_REC_SUCCESS
} from '../app/constants'


class TinderApi {
	constructor() {
		this.resetClient();
	}

	@observable actions = [];
	@observable waitingForAuthorization = false;
	sender = null;

	@action pushToActions = (action) => {
		return this.actions.push(action)
	};

	@action setWaitingFlag = (arg) => {
		this.waitingForAuthorization = arg;
	};

	@action deleteFirstAction = () => {
		this.actions.splice(0, 1);
	};

	resetClient = () => {
		this.client = new tinder.TinderClient();
	};

	sendToRenderer = (type, arg) => {
		this.sender.send(type, arg)
	};

	handleRequest = (event, arg) => {
		if (!this.sender) {
			this.sender = event.sender;
		}

		if (arg.type === API_AUTHORIZE && this.waitingForAuthorization) {
			this.manuallyAuthorize(arg);
		} else if (this.pushToActions(arg) === 1) {
			this.processActions();
		}
	};

	manuallyAuthorize = async (action) => {
		const method = this.actionToMethod(action);
		const token = await method();
		const responseType = this.getSuccessfulResponseType(action.type);
		this.sendToRenderer(responseType, token);
		this.setWaitingFlag(false);
	};

	processActions = async () => {
		const action = this.actions[0];
		const method = this.actionToMethod(action);

		let result, error;
		try {
			result = await method();
		} catch (err) {
			// TODO: add proper check whether this is a token expiration error
			error = err;
		}

		if (error) {
			console.log('error was caught');
			console.error(error);

			this.resetClient();
			this.setWaitingFlag(true);
			this.sendToRenderer(API_REQUIRE_AUTHORIZATION, null);
			const promise = new Promise((resolve, reject) => {
				when(
					() => !this.waitingForAuthorization,
					resolve
				)
			});
			await promise;
			console.log('Authorized again');
		} else {
			const responseType = this.getSuccessfulResponseType(action.type);
			this.sendToRenderer(responseType, result);
			this.deleteFirstAction();
		}

		if (this.actions.length) {
			this.processActions();
		}
		
		return null;
	};

	getSuccessfulResponseType = (type) => {
		switch (type) {
			case API_AUTHORIZE:
				return API_AUTHORIZE_SUCCESS;
			case API_SET_TOKEN:
				return API_SET_TOKEN_SUCCESS;
			case API_GET_HISTORY:
				return API_GET_HISTORY_SUCCESS;
			case API_GET_UPDATES:
				return API_GET_UPDATES_SUCCESS;
			case API_GET_USER:
				return API_GET_USER_SUCCESS;
			case API_GET_PROFILE:
				return API_GET_PROFILE_SUCCESS;
			case API_GET_REC:
				return API_GET_REC_SUCCESS;
		}
	};

	actionToMethod = (action) => {
		switch(action.type) {
			case API_AUTHORIZE:
				return async () => {
					await Promise.fromCallback(this.client.authorize.bind(null, action.fbToken, action.fbId));
					return this.client.getAuthToken();
				};
			case API_SET_TOKEN:
				return async () => {
					return Promise.resolve(this.client.setAuthToken(action.tinderToken));
				};
			case API_GET_HISTORY:
				return async () => {
					return Promise.fromCallback(this.client.getHistory)
				};
			case API_GET_UPDATES:
				return async () => {
					return Promise.fromCallback(this.client.getUpdates)
				};
			case API_GET_USER:
				return async () => {
					return Promise.fromCallback(this.client.getUser.bind(null, action.userId));
				};
			case API_GET_PROFILE:
				return async () => {
					return Promise.fromCallback(this.client.getAccount)
				};
			case API_GET_REC:
				return async () => {
					return Promise.fromCallback(this.client.getRecommendations.bind(null, 10000));
				}
		}
	};
}

const tinderApi = new TinderApi();
export default tinderApi;