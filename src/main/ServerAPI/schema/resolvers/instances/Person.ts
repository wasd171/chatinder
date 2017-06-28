import { UnionUserType, TinderPersonType } from 'shared/definitions'
import { property } from 'lodash'

export const Person = {
	smallPhoto: (person: UnionUserType) =>
		person.photos[0].processedFiles[3].url,
	galleryPhotos: (person: UnionUserType) =>
		person.photos.map(photo => ({ original: photo.processedFiles[0].url })),
	birthDate: property('birth_date'),
	distanceKm: (person: UnionUserType) => {
		if ((person as TinderPersonType).distance_mi != null) {
			return 1.60934 * (person as TinderPersonType).distance_mi
		} else {
			return null
		}
	},
	commonConnections: property('common_connections'),
	connectionCount: property('connection_count'),
	commonInterests: property('common_interests')
}
