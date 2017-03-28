import {GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql'


export const Profile = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        smallPhoto: {
            type: GraphQLString,
            resolve(obj, args, context) {
                return obj.smallPhoto
            }
        },
        name: {
            type: GraphQLString,
            resolve(obj, args, context) {
                return obj.name
            }
        }
    }
})

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        profile: {
            type: Profile,
            resolve(obj, args, context) {
                return {
                    name: 'wasd171',
                    smallPhoto: `http://images.gotinder.com/56bb513fd91e90ea31dd5fd3/84x84_c58c0eba-cdad-4b82-96f4-09c24fec5153.jpg`,
                    age: 22
                }
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query
})