import * as t from 'io-ts'
import { ioTinderHistoryUser, ioTinderJob, ioTinderSchool } from '.'

export const ioTinderBaseUser = t.intersection([
	ioTinderHistoryUser,
	t.interface({
		jobs: t.array(ioTinderJob),
		schools: t.array(ioTinderSchool)
	})
])
