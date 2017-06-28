import { success } from '../utils'
import { AbstractServerAPI } from 'shared/definitions'

export function showWindow(_obj: undefined, _args: {}, ctx: AbstractServerAPI) {
	ctx.app.show()
	return success
}
