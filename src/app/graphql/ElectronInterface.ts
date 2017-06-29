import { ipcRenderer } from 'electron'
import { GRAPHQL } from 'shared/constants'
import * as uuid from 'uuid'
import { print } from 'graphql/language/printer'
import { NetworkInterface, Request } from 'apollo-client'
import { ExecutionResult } from 'graphql'
import { PrintedRequest } from 'apollo-client/transport/networkInterface'
import { IGraphQLElectronMessage } from 'shared/definitions'

export interface IArgumments {
	id: string
	payload: ExecutionResult
}

export type ResolveType = (res: ExecutionResult) => any

export class ElectronInterface implements NetworkInterface {
	ipc
	listeners = new Map<string, ResolveType>()

	constructor(ipc = ipcRenderer) {
		this.ipc = ipc
		this.ipc.on(GRAPHQL, this.listener)
	}

	listener = (event, args: IArgumments) => {
		const { id, payload } = args
		if (!id) {
			throw new Error('Listener ID is not present!')
		}
		const resolve = this.listeners.get(id)
		if (!resolve) {
			throw new Error(`Listener with id ${id} does not exist!`)
		}
		resolve(payload)
		this.listeners.delete(id)
	}

	printRequest(request: Request): PrintedRequest {
		return {
			...request,
			query: print(request.query)
		}
	}

	generateMessage(id: string, request: Request): IGraphQLElectronMessage {
		return {
			id,
			payload: this.printRequest(request)
		}
	}

	setListener(request: Request, resolve: ResolveType) {
		const id = uuid.v1()
		this.listeners.set(id, resolve)
		const message = this.generateMessage(id, request)
		this.ipc.send(GRAPHQL, message)
	}

	query = (request: Request) => {
		return new Promise<ExecutionResult>(resolve =>
			this.setListener(request, resolve)
		)
	}
}
