// @flow
import { success } from '../utils'
const fbError = new Error('FB login is required')
import { ServerAPI } from 'main/ServerAPI'

type Arguments = {
	silent: boolean
}

export async function login(obj: void | null, args: Arguments, ctx: ServerAPI) {
	const { fb, tinder } = ctx

	tinder.resetClient()

	try {
		await tinder.authorize({ fbToken: fb.token, fbId: fb.id })
		return success
	} catch (err) {
		console.error('Initial auth failed, trying to relogin with Facebook')
	}

	try {
		await fb.login(args.silent)
		await tinder.authorize({ fbToken: fb.token, fbId: fb.id })
		return success
	} catch (err) {
		return { status: 'Unauthorized', err }
	}
}
