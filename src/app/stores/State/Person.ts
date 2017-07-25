import { types } from 'mobx-state-tree'
import { Photo, Job, School, Interest, Connection, emojify } from '.'
import { PhotoType } from '~/shared/definitions'

interface IGalleryPhoto {
	original: string
}

export const Person = types.model(
	'Person',
	{
		_id: types.identifier(types.string),
		birth_date: types.string,
		name: types.string,
		photos: types.array(Photo),
		bio: types.maybe(types.string),
		jobs: types.maybe(types.array(Job)),
		schools: types.maybe(types.array(School)),
		distance_mi: types.maybe(types.number),
		common_interests: types.maybe(types.array(Interest)),
		common_connections: types.maybe(types.array(Connection)),
		connection_count: types.maybe(types.number),

		get formattedName() {
			return emojify(this.name)
		},
		get formattedBio() {
			if (this.bio === null) {
				return null
			} else {
				return emojify(this.bio)
			}
		},
		get smallPhoto(): string {
			return this.photos[0].processedFiles[3].url
		},
		get galleryPhotos(): IGalleryPhoto[] {
			return this.photos.map((photo: PhotoType) => ({
				original: photo.processedFiles[0].url
			}))
		},
		get distanceKm() {
			if (this.distance_mi !== null) {
				return Math.round(1.60934 * this.distance_mi)
			} else {
				return null
			}
		}
	},
	{
		update(person: any) {
			Object.assign(this, person)
		}
	}
)
