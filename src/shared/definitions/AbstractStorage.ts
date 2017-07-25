export abstract class AbstractStorage {
	abstract save(key: string, value: any): Promise<any>
	abstract get(key: string): Promise<Object>
}
