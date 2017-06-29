import { success } from '../utils'
import { AbstractServerAPI } from '~/shared/definitions'

export interface IArguments {
	silent: boolean
}

export async function login(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	const { fb, tinder } = ctx

	tinder.resetClient()

	try {
		if (typeof fb.token !== 'string' || typeof fb.id !== 'string') {
			throw new Error('fbToken or fbId is not present')
		}
		await tinder.authorize({ fbToken: fb.token, fbId: fb.id })
		return success
	} catch (err) {
		console.error('Initial auth failed, trying to relogin with Facebook')
	}

	try {
		await fb.login(args.silent)
		await tinder.authorize(
			{ fbToken: fb.token, fbId: fb.id } as {
				fbToken: string;
				fbId: string;
			}
		)
		return success
	} catch (err) {
		return { status: 'Unauthorized', err }
	}
}
