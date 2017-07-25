import { AbstractServerAPI } from '~/shared/definitions'

export interface IArguments {
	silent: boolean
}

export async function loginFB(
	_obj: undefined,
	args: IArguments,
	ctx: AbstractServerAPI
) {
	await ctx.fb.login(args.silent)
	return ctx.fb
}
