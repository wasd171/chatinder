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
	API_GET_REC_SUCCESS,
	API_SEND_MESSAGE,
	API_SEND_MESSAGE_SUCCESS,
	API_GET_DEFAULTS,
	API_GET_DEFAULTS_SUCCESS
} from '../app/constants'


class TinderApi {
	constructor() {
		this.resetClient();
	}

	actions = new Map();
	iterator = this.actions.keys();
	waitingForAuthorization = false;
	sender = null;

	pushToActions = (action) => {
		let {type} = action;
		if (type === API_GET_USER) {
			type = `${API_GET_USER}_${action.userId}`
		}

		if (!this.actions.has(type)) {
			this.actions.set(type, action)
		}

		return this.actions.size
	};

	setWaitingFlag = (arg) => {
		this.waitingForAuthorization = arg;
	};

	resetClient = () => {
		this.client = new tinder.TinderClient();
		console.log('Client was reseted');
	};

	sendToRenderer = (type, arg) => {
		this.sender.send(type, arg)
	};

	handleRequest = async (event, arg) => {
		if (!this.sender) {
			this.sender = event.sender;
		}

		if (arg.type === API_AUTHORIZE && this.waitingForAuthorization) {
			await this.manuallyAuthorize(arg);
			this.processActions();
		} else if (this.pushToActions(arg) === 1) {
			this.processActions();
		}
	};

	manuallyAuthorize = async (action) => {
		console.log('manually Authorize called', action);
		const method = this.actionToMethod(action);
		const token = await method();
		console.log('token', token);
		const responseType = this.getSuccessfulResponseType(action.type);
		this.sendToRenderer(responseType, token);
		this.setWaitingFlag(false);
	};

	processActions = async () => {
		while (this.actions.size > 0 && !this.waitingForAuthorization) {
			await this.processAction();
		}
	};

	processAction = async () => {
		const {key, action} = this.getAction();
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
		} else {
			const responseType = this.getSuccessfulResponseType(action.type);
			this.sendToRenderer(responseType, result);
			this.actions.delete(key);
		}
	}

	getActionFormatter = (key) => {
		return {key, action: this.actions.get(key)}
	}

	getAction = () => {
		if (this.actions.has(API_AUTHORIZE)) {
			return this.getActionFormatter(API_AUTHORIZE);
		} else if (this.actions.has(API_SET_TOKEN)) {
			return this.getActionFormatter(API_SET_TOKEN)
		} else if (this.actions.has(API_GET_DEFAULTS)) {
			return this.getActionFormatter(API_GET_DEFAULTS)
		} else {
			const key = this.iterator.next().value;
			return this.getActionFormatter(key)
		}
	}

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
			case API_SEND_MESSAGE:
				return API_SEND_MESSAGE_SUCCESS;
			case API_GET_DEFAULTS:
				return API_GET_DEFAULTS_SUCCESS;
		}
	};

	actionToMethod = (action) => {
		switch(action.type) {
			case API_AUTHORIZE:
				return async () => {
					await Promise.fromCallback(this.client.authorize.bind(this.client, action.fbToken, action.fbId));
					return this.client.getAuthToken();
				};
			case API_SET_TOKEN:
				return () => {
					return Promise.resolve(this.client.setAuthToken(action.tinderToken));
				};
			case API_GET_HISTORY:
				return () => {
					return Promise.fromCallback(this.client.getHistory)
				};
			case API_GET_UPDATES:
				return () => {
					return Promise.fromCallback(this.client.getUpdates)
				};
			case API_GET_USER:
				return () => {
					return Promise.fromCallback(this.client.getUser.bind(null, action.userId));
				};
			case API_GET_PROFILE:
				return () => {
					return Promise.fromCallback(this.client.getAccount)
				};
			case API_GET_REC:
				return () => {
					return Promise.fromCallback(this.client.getRecommendations.bind(null, 10000));
				};
			case API_SEND_MESSAGE:
				return () => {
					return Promise.fromCallback(this.client.sendMessage.bind(null, action.to, action.message))
				};
			case API_GET_DEFAULTS:
				return () => {
					return Promise.resolve(this.client.getDefaults());
				};
		}
	};
}

const tinderApi = new TinderApi();
export default tinderApi;