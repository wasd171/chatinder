import { AbstractServerAPI, FormattedMatchType } from '~/shared/definitions'
import { fromCallback } from '~/shared/utils'

export interface IArguments {}

export type OutputType = Promise<Array<FormattedMatchType>>

export function matches(
	_obj: undefined,
	_args: IArguments,
	ctx: AbstractServerAPI
) {
	return fromCallback(callback =>
		ctx.db.matches.find({}, callback)
	) as OutputType
}
