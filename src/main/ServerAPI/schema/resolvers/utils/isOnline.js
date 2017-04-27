// @flow
import isReachable from 'is-reachable'


export async function isOnline(): Promise<boolean> {
    const [fb, tinder] = await Promise.all([
    	isReachable('https://www.facebook.com/'),
        isReachable('https://api.gotinder.com/')
    ]);

    return (fb && tinder)
}