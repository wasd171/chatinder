// @flow
export const Person = {
    smallPhoto: person => person.photos[0].processedFiles[3].url,
    galleryPhotos: person => person.photos.map(photo => ({original: photo.processedFiles[0].url})),
    birthDate: person => person.birth_date,
    distanceKm: person => 1.60934*person.distance_mi,
    commonConnections: person => person.common_connections,
    connectionCount: person => person.connection_count,
    commonInterests: person => person.common_interests
}