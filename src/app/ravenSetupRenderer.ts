import * as Raven from 'raven-js'

export function ravenSetupRenderer() {
	Raven.config(
		'https://da10ea27ad724a2bbd826e378e1c389b@sentry.io/183877'
	).install()
}
