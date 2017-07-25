type ErrorType = Error | undefined | null
export type IfromCallbackInnerCallback = (err: ErrorType, result?: any) => any
export type IfromCallbackParams = (done: IfromCallbackInnerCallback) => any

export function fromCallback(func: IfromCallbackParams) {
	return new Promise((resolve, reject) => {
		func((err, result) => {
			if (err != null) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}
