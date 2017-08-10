import { AbstractStorage } from '.'
import FbWebView from '~/app/scenes/App/components/FBWebView'

export abstract class AbstractFBSaved {
	token?: string
	expiresAt?: number
	id?: string
}

export abstract class AbstractFBParams extends AbstractFBSaved {
	storage: AbstractStorage
}

export interface FBGetTokenType {
	token: string
	expiresIn: number
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
	abstract setComponent: (component: FbWebView) => void
}
