declare module 'is-reachable' {
	function isReachable(url: string): Promise<boolean>

	export = isReachable
}
