// @flow
export default function generateMessage(id: string, res: any) {
	return {
		id,
		payload: res
	}
}
