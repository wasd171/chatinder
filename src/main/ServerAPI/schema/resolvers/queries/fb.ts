import { AbstractServerAPI } from '~/shared/definitions'

export interface IArguments {}

export interface IOutput {
	id?: string
	token?: string
}

export function fb(
	_obj: void,
	_args: IArguments,
	ctx: AbstractServerAPI
): IOutput {
	return {
		id: ctx.fb.id,
		token: ctx.fb.token
	}
}
