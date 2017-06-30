import * as t from 'io-ts'
import { ioUnionMessage } from '.'

export const ioFormattedMessage = t.intersection([
	ioUnionMessage,
	t.interface({
		status: t.string,
		sentDay: t.string,
		sentTime: t.string,
		isGIPHY: t.boolean,
		formattedMessage: t.string,
		first: t.boolean,
		firstInNewDay: t.boolean
	})
])
