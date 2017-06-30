import { count } from '../utils'
import { VIEW_MATCHES, VIEW_AUTH, routes } from '~/shared/constants'
import { AbstractServerAPI } from '~/shared/definitions'

export interface IArguments {}

export type OutputType = Promise<string>

export async function initialRoute(
	_obj: undefined,
	_args: IArguments,
	ctx: AbstractServerAPI
): OutputType {
	// TODO: implement proper first login when offline
	const matchesCount = await count(ctx.db.matches, {})
	if (matchesCount !== 0) {
		return routes[VIEW_MATCHES]
	} else {
		const { token, id } = ctx.fb
		if (typeof token !== 'undefined' && typeof id !== 'undefined') {
			return routes[VIEW_MATCHES]
		} else {
			return routes[VIEW_AUTH]
		}
	}
}
