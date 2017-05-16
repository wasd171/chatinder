// @flow
import { count } from '../utils'
import { VIEW_MAIN, VIEW_AUTH } from 'shared/constants'
import type { ServerAPI } from 'main/ServerAPI'
import { nameToPath } from 'shared/utils'

type Arguments = {}

type Output = Promise<string>

export async function initialRoute(
	obj: void,
	args: Arguments,
	ctx: ServerAPI
): Output {
	// TODO: implement proper first login when offline
	const matchesCount = await count(ctx.db.matches, {})
	if (matchesCount !== 0) {
		return nameToPath(VIEW_MAIN)
	} else {
		const { token, id } = ctx.fb
		if (typeof token !== 'undefined' && typeof id !== 'undefined') {
			return nameToPath(VIEW_MAIN)
		} else {
			return nameToPath(VIEW_AUTH)
		}
	}
}
