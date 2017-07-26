import { FBGetTokenType, AbstractStorage } from '.'

export abstract class AbstractFBSaved {
	token?: string
	expiresAt?: number
	id?: string
}

export abstract class AbstractFBParams extends AbstractFBSaved {
	storage: AbstractStorage
}

export abstract class AbstractFB extends AbstractFBParams {
	abstract save: () => Promise<{}>
	abstract setToken: (token: string) => Promise<{}>
	abstract setExpiration: (expiresAt: number) => Promise<{}>
	abstract setId: (id: string) => Promise<{}>

	abstract getId: () => Promise<string>
	abstract getToken: (silent: boolean) => Promise<FBGetTokenType>
	abstract loginForce: (silent: boolean) => Promise<void>
	abstract login: (silent: boolean) => Promise<void>
	abstract clear: () => Promise<{}>
}
