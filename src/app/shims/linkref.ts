import { Component } from 'react'

export type LinkRefArgumentType = HTMLElement | Component<any, any> | null

export interface ILinkedRefs {
	[key: string]: (element: LinkRefArgumentType) => any
}

export interface ILinkedComponent<P, V> extends Component<P, V> {
	_linkedRefs: ILinkedRefs
}

export default function linkRef(
	component: ILinkedComponent<any, any>,
	name: string
) {
	let cache = component._linkedRefs || (component._linkedRefs = {})
	return (
		cache[name] ||
		(cache[name] = (element: LinkRefArgumentType) => {
			component[name] = element
		})
	)
}
