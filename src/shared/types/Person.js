// @flow
import type {GalleryPhotoType} from './GalleryPhoto'


export type PersonType = {
    _id: string,
    name: string,
    smallPhoto: string,
    pingTime: string,
    galleryPhotos: GalleryPhotoType[],
    birthDate: string,
    formattedBio: string
}