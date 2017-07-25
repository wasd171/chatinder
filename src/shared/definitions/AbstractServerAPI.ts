import { AbstractServerAPIParams, IGraphQLElectronMessage } from '.'
import { ExecutionResult } from 'graphql'
import { PrintedRequest } from 'apollo-client/transport/networkInterface'

export abstract class AbstractServerAPI extends AbstractServerAPIParams {
	reloginInterval: null | NodeJS.Timer
	reloginCallbacks: null | Array<Function>

	abstract start: () => Promise<void>
	abstract callGraphQL: (payload: PrintedRequest) => Promise<ExecutionResult>
	abstract processRequest: (
		event: Electron.Event,
		args: IGraphQLElectronMessage
	) => Promise<void>
}
