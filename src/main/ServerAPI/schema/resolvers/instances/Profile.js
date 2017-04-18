// @flow
export const Profile = {
    smallPhoto: profile => profile.user.photos[0].processedFiles[3].url,
    name: profile => profile.user.name
}