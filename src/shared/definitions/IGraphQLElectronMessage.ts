import { PrintedRequest } from 'apollo-client/transport/networkInterface'

export interface IGraphQLElectronMessage {
	id: string
	payload: PrintedRequest
}
