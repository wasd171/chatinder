// @flow
import { success } from '../utils'
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
		//eslint-disable-next-line no-console
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
