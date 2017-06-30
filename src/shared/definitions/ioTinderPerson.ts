import * as t from 'io-ts'
import { ioTinderBaseUser, ioTinderInterest } from '.'

export const ioTinderPerson = t.intersection([
	ioTinderBaseUser,
	t.interface({
		distance_mi: t.number,
		common_interests: t.array(ioTinderInterest),
		common_connections: t.Array //Deprecated field?
	}),
	t.partial({
		connection_count: t.number
	})
])
