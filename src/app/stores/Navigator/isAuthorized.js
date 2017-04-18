// import query from './isAuthorized.gql'
import {gql} from 'react-apollo'


const query = gql`
    query isAuthorized {
        isAuthorized
    }
`;


export default async function isAuthorized(client) {
    const res = await client.query({query, fetchPolicy: 'network-only'});
    return res.data.isAuthorized
}