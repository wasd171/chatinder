import { fromCallback } from '~/shared/utils'
import { AbstractServerAPI, FormattedMatchType } from '~/shared/definitions'

export interface IArguments {
	id: string
}

export type OutputType = Promise<FormattedMatchType>

export function match(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	return fromCallback(callback =>
		ctx.db.matches.findOne({ _id: args.id }, callback)
	) as OutputType
}
