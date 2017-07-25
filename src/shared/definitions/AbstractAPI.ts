import { GetFbQuery, ShowWindowMutation } from '~/schema'
import { PersonType } from '.'

export interface IAPIGenericReturn {
	status: string
}

export interface IAPISendMessage {
	matchId: string
	message: string
}

export abstract class AbstractAPI {
	public abstract login(): Promise<IAPIGenericReturn>
	public abstract checkDoMatchesExist(): Promise<boolean>
	public abstract subscribeToUpdates(): Promise<IAPIGenericReturn>
	public abstract logout(): Promise<IAPIGenericReturn>
	public abstract getFB(): Promise<GetFbQuery>
	public abstract getInitialRoute(): Promise<string>
	public abstract showWindow(): Promise<ShowWindowMutation>
	public abstract relogin(): Promise<void>
	public abstract updateProfile(): Promise<void>
	public abstract updatePerson(person: PersonType): Promise<void>
	public abstract sendMessage(props: IAPISendMessage): Promise<void>
	public abstract resendMessage(messageId: string): Promise<void>
}
