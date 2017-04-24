// @flow
import gql from 'graphql-tag'


export default gql`
    type Profile {
        smallPhoto: String!
        name: String!
    }

	type GalleryPhoto {
        original: String!
    }

    type School {
        name: String!
        id: String!
    }

    type Company {
        name: String!
    }

    type JobTitle {
        name: String!
    }

    type Job {
        company: Company
        title: JobTitle
    }

    type CommonConnectionPhotos {
        small: String!
        medium: String!
        large: String!
    }

    type CommonConnection {
        id: String!
        name: String!
        degree: Int!
        photo: CommonConnectionPhotos!
    }

    type CommonInterest {
        name: String!
        id: String!
    }

    type Person {
        _id: String!
        name: String!
        formattedName: String!
        smallPhoto: String!
        pingTime: String!
        galleryPhotos: [GalleryPhoto]!
        birthDate: String!
        formattedBio: String
        schools: [School]
        distanceKm: Int
        jobs: [Job]
        commonConnections: [CommonConnection]
        connectionCount: Int
        commonInterests: [CommonInterest]
    }

    type Message {
        _id: String!
        from: String!
        sentDay: String!
        sentTime: String!
        sentDate: String!
        formattedMessage: String!
        first: Boolean!
        firstInNewDay: Boolean!
        isGIPHY: Boolean!
    }

    type Match {
        _id: String!
        person: Person!
        messages: [Message!]
        lastMessage: String!
        lastActivityDate: String!
        isSuperLike: Boolean!
    }

    type Query {
        profile: Profile
        isAuthorized: Boolean!
        match(id: String!): Match!
        matches: [Match!]
    }

    type GenericMutation {
        status: String!
    }

    type Mutation {
        login(silent: Boolean!): GenericMutation!
        showWindow: GenericMutation!
        fetchHistory: GenericMutation!
        logout: GenericMutation!
        sendMessage(id: String!, message: String!): Message!
        updatePerson(id: String!): Person!
        checkDoMatchesExist: Boolean!
        subscribeToUpdates: GenericMutation!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`