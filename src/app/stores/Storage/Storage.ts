import { AbstractStorage } from '~/shared/definitions'

export class Storage implements AbstractStorage {
	async save(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	async get(key: string) {
		const rawData = localStorage.getItem(key)
		let data: Object = {}

		if (rawData !== null) {
			data = JSON.parse(rawData)
		}

		return data
	}
}
