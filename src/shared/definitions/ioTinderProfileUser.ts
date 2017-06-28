import * as t from 'io-ts'
import {
	ioTinderBaseUser,
	ioTinderProfileInterest,
	ioTinderProfileSchool
} from '.'

export const ioTinderProfileUser = t.intersection([
	ioTinderBaseUser,
	t.interface({
		interests: t.array(ioTinderProfileInterest),
		jobs: t.Array,
		schools: t.array(ioTinderProfileSchool)
	})
])
