import { AbstractFBParams, FBSaveQueryType, FBGetTokenType } from '.'

export abstract class AbstractFB extends AbstractFBParams {
	abstract save: (query: FBSaveQueryType) => Promise<number>
	abstract setToken: (token: string) => Promise<number>
	abstract setExpiration: (expiresAt: number) => Promise<number>
	abstract setId: (id: string) => Promise<number>

	abstract getId: () => Promise<string>
	abstract getToken: (silent: boolean) => Promise<FBGetTokenType>
	abstract loginForce: (silent: boolean) => Promise<void>
	abstract login: (silent: boolean) => Promise<void>
}
