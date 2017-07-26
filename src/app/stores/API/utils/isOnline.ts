const isReachable = require('is-reachable')
import TinderClient from 'tinder-modern'

export async function isOnline(): Promise<boolean> {
	const [fb, tinder] = await Promise.all([
		isReachable('https://www.facebook.com/'),
		TinderClient.isOnline()
	])
	return fb && tinder
}
