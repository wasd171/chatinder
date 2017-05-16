// @flow
import { property } from 'lodash'

export const Person = {
	smallPhoto: person => person.photos[0].processedFiles[3].url,
	galleryPhotos: person =>
		person.photos.map(photo => ({ original: photo.processedFiles[0].url })),
	birthDate: property('birth_date'),
	distanceKm: person => 1.60934 * person.distance_mi,
	commonConnections: property('common_connections'),
	connectionCount: property('connection_count'),
	commonInterests: property('common_interests')
}
