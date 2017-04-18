import {gql} from 'react-apollo'


export default gql`
    mutation showWindow {
        showWindow {
            status
        }
    }
`