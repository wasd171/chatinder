import * as Raven from 'raven'

export function ravenSetupMain() {
	Raven.config(
		'https://da10ea27ad724a2bbd826e378e1c389b:00489345c287416fad67161c62002221@sentry.io/183877'
	).install()
}
