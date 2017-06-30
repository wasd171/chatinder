declare module 'is-reachable' {
	function isReachable(url: string): Promise<boolean>
	export = isReachable
}

declare module '*.graphql' {
	import { DocumentNode, Location, DefinitionNode } from 'graphql'
	export const kind: 'Document'
	export const loc: Location | undefined
	export const definitions: Array<DefinitionNode>
}

declare module 'emojione/package.json' {
	export const version: string
}
