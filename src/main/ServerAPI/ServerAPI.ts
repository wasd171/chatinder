import {
	AbstractServerAPI,
	AbstractServerAPIParams,
	IGraphQLElectronMessage
} from '~/shared/definitions'
import { ipcMain } from 'electron'
import { GRAPHQL } from '~/shared/constants'
import { graphql, ExecutionResult } from 'graphql'
import { PrintedRequest } from 'apollo-client/transport/networkInterface'

import { getInitialProps } from './getInitialProps'

export class ServerAPI extends AbstractServerAPI implements AbstractServerAPI {
	reloginInterval: null | NodeJS.Timer = null
	reloginCallbacks: null | Array<Function> = null

	constructor(params: AbstractServerAPIParams) {
		super()
		Object.assign(this, params)
	}

	start = async () => {
		ipcMain.on(GRAPHQL, this.processRequest)
		await this.app.start()
		this.app.reload()
	}

	callGraphQL = (payload: PrintedRequest): Promise<ExecutionResult> => {
		const { query, variables, operationName } = payload
		if (query == null) {
			throw new Error('Got empty query from IPC')
		}
		return graphql(
			this.schema,
			query,
			null,
			this,
			variables,
			operationName != null ? operationName : undefined
		)
	}

	processRequest = async (
		_event: Electron.IpcMainEvent,
		{ id, payload }: IGraphQLElectronMessage
	) => {
		const res = await this.callGraphQL(payload)
		const message = ServerAPI.generateMessage(id, res)

		if (this.app.window !== null) {
			this.app.window.webContents.send(GRAPHQL, message)
		}
	}

	static generateMessage(id: string, payload: ExecutionResult) {
		return {
			id,
			payload
		}
	}

	static getInitialProps = getInitialProps
}
