import { gql } from 'react-apollo'

export default gql`
    query getInitialState {
        view {
            path
            params
        }
    }
`
