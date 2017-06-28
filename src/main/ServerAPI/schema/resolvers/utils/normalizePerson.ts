import { emojify } from 'shared/utils'
import { UnionUserType, FormattedUserType } from 'shared/definitions'

export function normalizePerson(person: UnionUserType): FormattedUserType {
	let formattedName = emojify(person.name)
	let formattedBio: string | undefined
	if (typeof person.bio !== 'undefined') {
		formattedBio = emojify(person.bio)
	}
	return { ...person, formattedName, formattedBio }
}
