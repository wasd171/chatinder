export interface IGetFBTokenFailure {
	err: Error
}

export interface IGetFBTokenSuccess {
	token: string
	expiresIn: number
}

export type GetFBTokenType = IGetFBTokenFailure | IGetFBTokenSuccess

export abstract class AbstractServerAPI {
	abstract start: () => Promise<void>
}
