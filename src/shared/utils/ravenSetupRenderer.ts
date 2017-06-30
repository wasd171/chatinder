export function ravenSetupRenderer() {
	const Raven = require('raven-js')

	Raven.config(
		'https://da10ea27ad724a2bbd826e378e1c389b@sentry.io/183877'
	).install()
}
